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
} from '@angular/core';

import { AnnotationOverlay } from '../annotation-overlay/annotation-overlay';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { Annotation, UserResponse } from '../../../models/annotation';
import { LocalStorageConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorage } from '../../../services/local-storage/local-storage';
import { Utilities } from '../../../services/utilities/utilities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-video-view',
  imports: [AnnotationOverlay, VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements AfterViewInit, OnInit, OnDestroy {
  private appRef = inject(ApplicationRef);
  private communication = inject(CommunicationService);
  private injector = inject(EnvironmentInjector);
  private localStorage = inject(LocalStorage);
  private utilities = inject(Utilities);

  // annotations: Annotation[];
  annotationToDisplay: Annotation;
  playerSubscription: Subscription;
  showAnnotation: boolean = false;
  trackTimestamp: number[] = [];
  videoId: string;

  ngOnInit() {
    // TODO - this does not work, it needs to be an observable or video id needs to be set on click of the card
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
    console.log('VIDEO ID', this.videoId);
    console.log('ANNOTATION');

    // TODO - move this to utilities
    // console.log('annotations', this.annotations);
    // this.displayAnnotations();
  }

  ngAfterViewInit() {
    this.displayAnnotations();
  }

  ngOnDestroy() {
    // Need to formally unsubscribe:
    // Unlike subscriptions in other components, this one is not
    // automatically completed like when using take(1) or AsyncPipe
    this.playerSubscription.unsubscribe();
  }

  getAnnotationsByVideoId() {
    const allAnnotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
    return allAnnotations.filter((annotation: Annotation) => annotation.videoId === this.videoId);
  }

  displayAnnotations() {
    console.log('in display annotations');
    // would get this from an api and/or a shared service. not necessary in this case since it's easy
    // to grab from local storage. if you can keep it simple, then do

    const annotations = this.getAnnotationsByVideoId();

    this.playerSubscription = this.communication.getVideoPlayer$().subscribe((player) => {
      let lastTriggeredTime = -1; // Prevents multiple triggers within the same second

      player.on('timeupdate', () => {
        var currentTime = Math.floor(player.currentTime()); // Round time to whole seconds
        // Prevent multiple triggers within the same second
        if (currentTime === lastTriggeredTime) return;
        lastTriggeredTime = currentTime;

        // i had annotations here before
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
    // TODO - the overlay is going over the whole screen anyway so maybe i don't have to append child to app-player
    // can just add annotation overlay as a component here
    // or there was like a way to pass it in or something from primeng? not sure

    console.log('show annotation overlay, annotation is', annotation);
    // Create a host element for the popup
    const host = document.createElement('overlay-host');
    // Create the component and bind in one call
    const ref = createComponent(AnnotationOverlay, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('annotation', () => annotation),
        // overlay doesn't work when this is uncommented
        outputBinding('closed', () => {
          //player.play();
          //player.controls(true);
          console.log('CLOSED');
          document.body.removeChild(host);
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        }),
      ],
    });
    // Registers the component’s view so it participates in change detection cycle.
    this.appRef.attachView(ref.hostView);
    // host.show();
    // Inserts the provided host element into the DOM (outside the normal Angular view hierarchy).
    // This is what makes the popup visible on screen, typically used for overlays or modals.
    // document.getElementById('videoPlayer')?.appendChild(host);
    document.body.appendChild(host);
  }
}
