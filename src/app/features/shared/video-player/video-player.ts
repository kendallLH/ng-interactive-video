import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';
import 'videojs-youtube';
// import Player from 'video.js/dist/types/player';

import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  @Input() videoId: string;
  private communicationService = inject(CommunicationService);

  // See options: https://videojs.com/guides/options

  player: any; // ugh don't like this but we'll see

  // Instantiate a Video.js player OnInit
  ngAfterViewInit() {
    const options = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      // sources: [{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }],
      techOrder: ['youtube'],
      sources: [{ type: 'video/youtube', src: `https://www.youtube.com/watch?v=${this.videoId}` }],
    };
    this.player = videojs(this.target.nativeElement, options, function onPlayerReady() {
      // for non-youtube
      // this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      // this.player.on('userinactive', () => {
      //   console.log('User is inactive, do something with Angular component state');
      //   // Example: Pause the video
      //   player.pause();
      // });
      // player.on('useractive', () => {
      //   console.log('User is active again');
      // })
      // player.on('loadedmetadata', function () {
      //  // save the user's place in video
      //   var savedTime = localStorage.getItem('video-' + this.id() + '-last-time');
      //   if (savedTime) {
      //     this.currentTime(savedTime);
      //   }
      // });
    });
    this.communicationService.setVideoPlayer(this.player);
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
