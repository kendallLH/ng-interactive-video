import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AnnotationList } from '../annotation-list/annotation-list';
import { AnnotationInput } from '../annotation-input/annotation-input';
import { VideoPlayer } from '../../shared/video-player/video-player';
import { CommunicationService } from '../../../services/communication/communication-service';
import { Utilities } from '../../../services/utilities/utilities';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-video-view',
  imports: [
    AnnotationList,
    ButtonModule,
    FormsModule,
    AnnotationInput,
    SelectButtonModule,
    VideoPlayer,
  ],
  templateUrl: './teacher-video-view.html',
  styleUrl: './teacher-video-view.scss',
})
export class TeacherVideoView {
  // TODO - service naming is inconsistent!!
  private communicationService = inject(CommunicationService);
  private utilities = inject(Utilities);

  annotationTypeOptions: any[] = [{ name: 'Multi-Choice', value: 1 }];
  className = 'Generic Class'; // TODO - need to send the classname to a shared service or something w/ video info this is jsut hardcoded
  isAddAnnotation: WritableSignal<boolean>;
  timestamp: number;
  videoId: string;
  selectedAnnotationType: string;

  ngOnInit() {
    // Connect to the signal that tells us if add annotation box should be open or closed
    this.isAddAnnotation = this.communicationService.getShowInteractiveCard();
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
  }

  addAnnotation() {
    // Open the card for the user to input values
    this.communicationService.setShowInteractiveCard(true);
    // Pause the video player
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        player.pause();
        this.timestamp = player.currentTime();

        // show form overlayed over video
        // for now use css positioning, but maybe upgrade to videojs plugin
        // https://www.npmjs.com/package/videojs-overlay
        // https://codepen.io/fealaer/pen/RwbKeye
      });
  }
}
