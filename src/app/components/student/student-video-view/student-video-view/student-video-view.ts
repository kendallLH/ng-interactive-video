import { Component, inject, OnInit } from '@angular/core';

import { Utilities } from '../../../../services/utilities/utilities';
import { VideoPlayer } from '../../../video-view/video-player/video-player';

@Component({
  selector: 'app-student-video-view',
  imports: [VideoPlayer],
  templateUrl: './student-video-view.html',
  styleUrl: './student-video-view.scss',
})
export class StudentVideoView implements OnInit {
  private utilities = inject(Utilities);
  videoId: string;

  ngOnInit() {
    this.videoId = this.utilities.getVideoIdFromBrowserUrl();
  }
}
