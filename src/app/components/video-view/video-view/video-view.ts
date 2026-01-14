import { Component, inject } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';

import { VideoPlayer } from '../video-player/video-player';
import { take } from 'rxjs/operators';
import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-video-view',
  imports: [SpeedDialModule, VideoPlayer],
  templateUrl: './video-view.html',
  styleUrl: './video-view.scss',
})
export class VideoView {
  private communicationService = inject(CommunicationService);

  videoOptions = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: false,
    sources: [{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }],
  };
  url = 'https://vjs.zencdn.net/v/oceans.mp4';
  items = [
    {
      label: 'Multiple Choice',
      icon: 'pi pi-plus',
      command: () => {
        console.log('Add multiple choice clicked!');
        // Your add logic here
        this.addInteraction();
      },
    },
    {
      label: 'Note',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Add note choice clicked!');
        // Your add logic here
        this.addInteraction();
      },
    },
  ];

  ngOnInit() {
    console.log('in video view parent url is', this.url);
  }

  addInteraction() {
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        // // TODO: convert timestamp from seconds to 00h00m00s
        player.pause();
        player.currentTime();
      });
  }
}
