import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { AnnotationList } from '../annotation-list/annotation-list';
import { AnnotationInput } from '../annotation-input/annotation-input';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { CommunicationService } from '../../../services/communication/communication-service';
import { Utilities } from '../../../services/utilities/utilities';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-video-view',
  imports: [AnnotationList, ButtonModule, FormsModule, AnnotationInput, VideoPlayer],
  templateUrl: './teacher-video-view.html',
  styleUrl: './teacher-video-view.scss',
})
export class TeacherVideoView {
  // TODO - service naming is inconsistent!!
  private communicationService = inject(CommunicationService);
  private utilities = inject(Utilities);
  isAddAnnotation: WritableSignal<boolean>;
  timestamp: number;
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
  }

  /**
   * The add annotation popover is opened on click of the element.
   * This function pauses the video player and grabs the current timestamp
   * to pre-fill in the popover.
   */
  addAnnotation() {
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        player.pause();
        this.timestamp = player.currentTime();
      });
  }
}
