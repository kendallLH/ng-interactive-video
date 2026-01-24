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
import { Utilities } from '../../../services/utilities/utilities';

@Component({
  selector: 'app-student-video-view',
  imports: [AnnotationOverlay, VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements AfterViewInit, OnInit, OnDestroy {
  private appRef = inject(ApplicationRef);
  private communicationService = inject(CommunicationService);
  private injector = inject(EnvironmentInjector);
  private localStorageService = inject(LocalStorageService);
  private utilities = inject(Utilities);

  // annotations: Annotation[];
  annotationToDisplay: Annotation;
  playerSubscription: Subscription;
  showAnnotation: boolean = false;
  trackTimestamp: number[] = [];
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
    console.log('VIDEO ID', this.videoId);
    console.log('ANNOTATION');
  }

  ngAfterViewInit() {
    this.displayAnnotations();
  }

  /**
   * Formally unsubscribe to the observable when the component is destroyed.
   * Unlike subscriptions the subscriptions in other components that use take(1) or AsyncPipe, this one is not automatically completed
   */
  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

  // TODO make an annotation sservice?

  getAnnotationsByVideoId() {
    const allAnnotations = this.localStorageService.getListItems(LocalStorageConstants.ANNOTATIONS);
    return allAnnotations.filter((annotation: Annotation) => annotation.videoId === this.videoId);
  }

  displayAnnotations() {
    console.log('in display annotations');
    // would get this from an api and/or a shared service. not necessary in this case since it's easy
    // to grab from local storage. if you can keep it simple, then do

    const annotations = this.getAnnotationsByVideoId();

    this.playerSubscription = this.communicationService.getVideoPlayer$().subscribe((player) => {
      let lastTriggeredTime = -1; // Prevents multiple triggers within the same second

      player.on('timeupdate', () => {
        var currentTime = Math.floor(player.currentTime()); // Round time to whole seconds
        // Prevent multiple triggers within the same second
        if (currentTime === lastTriggeredTime) return;
        lastTriggeredTime = currentTime;

        console.log('this.annotations before the for loop', annotations);
        annotations.forEach((annotation: Annotation) => {
          // i don't think filtered annotations will work as is
          console.log('ANNOTATION', annotation);
          console.log('CURRENT TIME', currentTime);
          console.log('this video id', this.videoId);
          // if annotation id === any annotiation id listed in user response then
          if (
            // annotation.videoId === this.videoId &&
            annotation.timestamp === currentTime &&
            this.trackTimestamp.indexOf(annotation.timestamp) === -1 // can i use user response here instead?
          ) {
            player.pause(); // Pause the video
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
