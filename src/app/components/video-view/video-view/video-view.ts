import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { VideoPlayer } from '../video-player/video-player';

@Component({
  selector: 'app-video-view',
  imports: [ButtonModule, VideoPlayer],
  templateUrl: './video-view.html',
  styleUrl: './video-view.scss',
})
export class VideoView {
  videoOptions = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: false,
    sources: [{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }],
  };
  url = 'https://vjs.zencdn.net/v/oceans.mp4';

  ngOnInit() {
    console.log('in video view parent url is', this.url);
  }

  addInteraction() {}
}
