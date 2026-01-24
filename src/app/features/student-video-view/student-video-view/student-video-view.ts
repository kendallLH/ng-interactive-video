import {
  ApplicationRef,
  Component,
  createComponent,
  EnvironmentInjector,
  inject,
  inputBinding,
  outputBinding,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
} from '@angular/core';
import { Subscription, take } from 'rxjs';

import { AnnotationOverlay } from '../annotation-overlay/annotation-overlay';
import { Annotation } from '../../../models/annotation';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { LocalStorageConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorageService } from '../../../services/local-storage/local-storage-service';
import { UtilityService } from '../../../services/utility/utility-service';

@Component({
  selector: 'app-student-video-view',
  imports: [VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements AfterViewInit, OnInit, OnDestroy {
  private appRef = inject(ApplicationRef);
  private communicationService = inject(CommunicationService);
  private injector = inject(EnvironmentInjector);
  private localStorageService = inject(LocalStorageService);
  private utilityService = inject(UtilityService);
  annotationToDisplay: Annotation;
  playerSubscription: Subscription;
  showAnnotation: boolean = false;
  trackTimestamp: number[] = [];
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilityService.getVideoIdFromBrowserUrl();
  }

  ngAfterViewInit() {
    this.displayAnnotations();
  }

  /**
   * Formally unsubscribe to the observable when the component is destroyed.
   * Unlike the subscriptions in other components that use take(1) or AsyncPipe,
   * this one is not automatically completed.
   */
  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

  getAnnotationsByVideoId() {
    const allAnnotations = this.localStorageService.getListItems(LocalStorageConstants.ANNOTATIONS);
    return allAnnotations.filter((annotation: Annotation) => annotation.videoId === this.videoId);
  }

  displayAnnotations() {
    const annotations = this.getAnnotationsByVideoId();
    this.playerSubscription = this.communicationService.getVideoPlayer$().subscribe((player) => {
      let lastTriggeredTime = -1;
      player.on('timeupdate', () => {
        // Round time to whole seconds
        var currentTime = Math.floor(player.currentTime());
        // Prevent multiple triggers within the same second
        if (currentTime === lastTriggeredTime) return;
        lastTriggeredTime = currentTime;

        annotations.forEach((annotation: Annotation) => {
          if (
            annotation.timestamp === currentTime &&
            this.trackTimestamp.indexOf(annotation.timestamp) === -1
          ) {
            player.pause();
            player.controls(false);
            this.showAnnotationOverlay(annotation);
            this.trackTimestamp.push(annotation.timestamp); // Mark this timestamp as answered
          }
        });
      });
    });
  }

  showAnnotationOverlay(annotation: Annotation) {
    // Create a host element for the popup
    const host = document.createElement('overlay-host');
    // Create the component and bind in one call
    const ref = createComponent(AnnotationOverlay, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('annotation', () => annotation),
        outputBinding('closed', () => {
          this.onCloseOverlay(host, ref);
        }),
      ],
    });
    // Registers the component’s view so it participates in change detection cycle
    this.appRef.attachView(ref.hostView);
    document.body.appendChild(host);
  }

  onCloseOverlay(host: HTMLElement, ref: ComponentRef<AnnotationOverlay>) {
    // Play the player and reset controls
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player) => {
        player.controls(true);
        player.play();
      });

    // Destroy the element ref and styling
    document.body.classList.remove('p-overflow-hidden'); // Bug in PrimeNg: https://github.com/primefaces/primeng/issues/19251
    document.body.removeChild(host);
    this.appRef.detachView(ref.hostView);
    ref.destroy();
  }
}
