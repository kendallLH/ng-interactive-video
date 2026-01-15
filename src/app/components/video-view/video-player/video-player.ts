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
import '@filmgardi/videojs-markers';

import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements AfterViewInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  private communicationService = inject(CommunicationService);

  // See options: https://videojs.com/guides/options
  // TODO: make a type for these options
  options = {
    fluid: true,
    aspectRatio: '16:9',
    autoplay: false,
    // sources: [{ src: 'https://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' }],
    techOrder: ['youtube'],
    sources: [{ type: 'video/youtube', src: 'https://youtu.be/__Uw1SXPW7s?si=Bf3uyaaM6V2QszuX' }],
  };
  player: any; // ugh don't like this but we'll see

  // Instantiate a Video.js player OnInit
  ngAfterViewInit() {
    // for youtube
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
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
    this.setTimestampMarker();
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  setTimestampMarker() {
    this.player.markers({
      markers: [
        { time: 10, text: 'Chapter 1 Start', classname: 'my-icon-class' },
        { time: 35.5, text: 'Key Moment', classname: 'my-icon-class' },
        { time: 60, text: 'End of Segment', classname: 'my-icon-class' },
      ],
    });
    // Example 1
    // var duration = this.player.duration(); // Get video duration
    // var markers = [
    //   { time: 30, iconClass: 'timestamp-marker', id: 'marker-1' }, // 30 seconds
    //   { time: 120, iconClass: 'timestamp-marker', id: 'marker-2' }, // 2 minutes
    // ];
    // Example 2
    // var markerContainer = document.querySelector('.timestamp-marker-container');
    // console.log('marker container', markerContainer);
    // // Add markers to the container
    // markers.forEach((marker) => {
    //   if (duration && marker.time < duration) {
    //     var markerElement = document.createElement('div');
    //     markerElement.className = marker.iconClass;
    //     markerElement.id = marker.id;
    //     // Calculate left position as a percentage of duration
    //     var leftPosition = (marker.time / duration) * 100;
    //     markerElement.style.left = leftPosition + '%';
    //     // Optional: Add click handler to jump to timestamp
    //     // markerElement.addEventListener('click', function () {
    //     //   this.player.currentTime(marker.time);
    //     // });
    //     markerContainer?.appendChild(markerElement);
    //   }
    // });
  }

  testButton() {
    this.player.pause();
    console.log('current time', this.player.currentTime());
  }
}
