import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoCard } from '../video-card/video-card';
import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorage } from '../../services/local-storage/local-storage';
import { LocalStorageConstants } from '../../shared/constants';

@Component({
  selector: 'app-video-list',
  imports: [AsyncPipe, VideoCard],
  templateUrl: './video-list.html',
  styleUrl: './video-list.scss',
})
export class VideoList implements OnInit {
  private localStorage = inject(LocalStorage);
  private communication = inject(CommunicationService);
  videos$: Observable<any[]>; // TODO: define proper type;

  ngOnInit() {
    this.videos$ = this.communication.getVideos$();
    const storedVideos = this.localStorage.getListItems(LocalStorageConstants.VIDEOS);
    if (storedVideos && storedVideos.length > 0) {
      this.communication.setVideos(storedVideos);
    }

    // TODO REMOVE THIS - for testing only
    this.communication.getVideos$().subscribe((videos) => {
      console.log('video list observable updated videos:', videos);
    });
  }
}
