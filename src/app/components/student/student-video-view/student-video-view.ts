import {
  ApplicationRef,
  Component,
  createComponent,
  EnvironmentInjector,
  inject,
  inputBinding,
  outputBinding,
  OnInit,
} from '@angular/core';

import { AnnotationOverlay } from '../annotation-overlay/annotation-overlay';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { Annotation, UserResponse } from '../../../models/annotation';
import { LocalStorageConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorage } from '../../../services/local-storage/local-storage';
import { Utilities } from '../../../services/utilities/utilities';

@Component({
  selector: 'app-student-video-view',
  imports: [AnnotationOverlay, VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements OnInit {
  private appRef = inject(ApplicationRef);
  private communication = inject(CommunicationService);
  private injector = inject(EnvironmentInjector);
  private localStorage = inject(LocalStorage);
  private utilities = inject(Utilities);

  annotations: Annotation[];
  trackTimestamp: number[] = [];
  userResponses: UserResponse[] = [];
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();

    // TODO - move this to utilities
    this.annotations = this.getAnnotationsByVideoId();
    this.displayAnnotations();
  }

  getAnnotationsByVideoId() {
    // get annotations associated with this video id // in future would be an api call
    const allAnnotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
    return allAnnotations.filter((annotation: Annotation) => annotation.videoId === this.videoId);
  }

  displayAnnotations() {
    // would get this from an api and/or a shared service. not necessary in this case since it's easy
    // to grab from local storage. if you can keep it simple, then do

    // const annotations = this.getVideoAnnotations();
    this.communication.getVideoPlayer$().subscribe((player) => {
      let lastTriggeredTime = -1; // Prevents multiple triggers within the same second
      player.on('timeupdate', () => {
        var currentTime = Math.floor(player.currentTime()); // Round time to whole seconds
        // Prevent multiple triggers within the same second
        if (currentTime === lastTriggeredTime) return;
        lastTriggeredTime = currentTime;
        this.annotations.forEach((annotation: Annotation) => {
          // i don't think filtered annotations will work as is
          console.log('ANNOTATION', annotation);
          console.log('CURRENT TIME', currentTime);
          // if annotation id === any annotiation id listed in user response then
          if (
            annotation.timestamp === currentTime &&
            this.trackTimestamp.indexOf(annotation.timestamp) === -1 // can i use user response here instead?
          ) {
            // player.pause(); // Pause the video
            // player.controls(false);
            this.showAnnotationOverlay(annotation);
            const userResponse = {
              id: '1', // hardcoded for now
              annotationId: annotation.id,
              studentId: 'xyz123', // hardcoded for now
            };

            this.userResponses.push(userResponse);
            this.trackTimestamp.push(annotation.timestamp); // Mark this timestamp as answered
          }
        });
      });
    }); // TODO unsubscribe on destroy
  }

  showAnnotationOverlay(annotation: Annotation) {
    // TODO - the overlay is going over the whole screen anyway so maybe i don't have to append child to app-player

    console.log('IN SHOW ANNOTAITON OVERLAY');
    // Create a host element for the popup
    const host = document.createElement('overlay-host');
    // Create the component and bind in one call
    const ref = createComponent(AnnotationOverlay, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('annotation', () => annotation),
        // outputBinding('closed', () => {
        //   document.body.removeChild(host);
        //   this.appRef.detachView(ref.hostView);
        //   ref.destroy();
        // }),
      ],
    });
    // Registers the component’s view so it participates in change detection cycle.
    this.appRef.attachView(ref.hostView);
    // Inserts the provided host element into the DOM (outside the normal Angular view hierarchy).
    // This is what makes the popup visible on screen, typically used for overlays or modals.
    document.body.appendChild(host);
  }
}
