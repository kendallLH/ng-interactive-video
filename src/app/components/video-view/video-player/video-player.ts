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
import Player from 'video.js/dist/types/player';
import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
  private communicationService = inject(CommunicationService);

  // Code adapted from: https://videojs.org/guides/angular/
  @ViewChild('target', { static: true }) target: ElementRef;
  // See options: https://videojs.com/guides/options
  // TODO: make a type for these options
  @Input() options: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: Player;

  // Instantiate a Video.js player OnInit
  ngAfterViewInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
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

  testButton() {
    this.player.pause();
    console.log('current time', this.player.currentTime());
  }
}
