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
  // Using an "any" type is not ideal, in this case I found it necessary. When importing and using the
  // "Player" type, type errors prevented the necessary methods from being accessed
  player: any;

  ngAfterViewInit() {
    const options = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      techOrder: ['youtube'],
      sources: [{ type: 'video/youtube', src: `https://www.youtube.com/watch?v=${this.videoId}` }],
    };
    this.player = videojs(this.target.nativeElement, options, function onPlayerReady() {});
    this.communicationService.setVideoPlayer(this.player);
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
