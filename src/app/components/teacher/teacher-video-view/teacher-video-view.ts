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

  annotationTypeOptions: any[] = [{ name: 'Multi-Choice', value: 1 }];
  isAddAnnotation: WritableSignal<boolean>;
  timestamp: number;
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
  }

  addAnnotation() {
    console.log('ADD ANNOTATINO');
    // Pause the video player
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        player.pause();
        this.timestamp = player.currentTime();
        // player.title;

        // console.log('TITLE', player.titleBar.state.title, player.el().title);

        // show form overlayed over video
        // for now use css positioning, but maybe upgrade to videojs plugin
        // https://www.npmjs.com/package/videojs-overlay
        // https://codepen.io/fealaer/pen/RwbKeye
      });
  }
}
