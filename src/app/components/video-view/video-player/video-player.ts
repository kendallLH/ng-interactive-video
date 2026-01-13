import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
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
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {});
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
