import { Component, inject, OnInit } from '@angular/core';

import { Utilities } from '../../../../services/utilities/utilities';
import { VideoPlayer } from '../../../video-view/video-player/video-player';
import { CommunicationService } from '../../../../services/communication/communication-service';
import { LocalStorage } from '../../../../services/local-storage/local-storage';
import { LocalStorageConstants } from '../../../../shared/constants';
import { Annotation, UserResponse } from '../../../../models/annotation';

@Component({
  selector: 'app-student-video-view',
  imports: [VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements OnInit {
  private communication = inject(CommunicationService);
  private localStorage = inject(LocalStorage);
  private utilities = inject(Utilities);

  trackTimestamp: number[] = [];
  userResponses: UserResponse[];
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();

    this.getVideoAnnotations();
    this.displayAnnotations();
  }

  getVideoAnnotations() {
    // get annotations associated with this video id // in future would be an api call
  }

  displayAnnotations() {
    // would get this from an api and/or a shared service. not necessary in this case since it's easy
    // to grab from local storage. if you can keep it simple, then do
    const allAnnotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
    const filteredAnnotations = allAnnotations.filter(
      (annotation: Annotation) => annotation.videoId === this.videoId,
    );
    console.log('FILTERED ANNOTATION outside player', filteredAnnotations);
    this.communication.getVideoPlayer$().subscribe((player) => {
      let lastTriggeredTime = -1; // Prevents multiple triggers within the same second
      player.on('timeupdate', () => {
        var currentTime = Math.floor(player.currentTime()); // Round time to whole seconds
        // Prevent multiple triggers within the same second
        if (currentTime === lastTriggeredTime) return;
        lastTriggeredTime = currentTime;
        filteredAnnotations.forEach((annotation) => {
          // i don't think filtered annotations will work as is
          console.log('ANNOTATION', annotation);
          console.log('CURRENT TIME', currentTime);
          // if annotation id === any annotiation id listed in user response then
          if (
            annotation.timestamp === currentTime &&
            this.trackTimestamp.indexOf(annotation.timestamp) === -1 // can i use user response here instead?
          ) {
            // showQuizPopup(quiz); // Show the quiz
            // player.pause(); // Pause the video
            // player.controls(false);
            window.alert('Video has reached an annotation');
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
}
