import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoCard } from '../video-card/video-card';
import { Video } from '../../../models/video';
import { LocalStorageConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorageService } from '../../../services/local-storage/local-storage-service';

@Component({
  selector: 'app-video-list',
  imports: [AsyncPipe, VideoCard],
  templateUrl: './video-list.html',
  styleUrl: './video-list.scss',
})
export class VideoList implements OnInit {
  private localStorageService = inject(LocalStorageService);
  private communicationService = inject(CommunicationService);
  videos$: Observable<Video[]>;

  ngOnInit() {
    this.videos$ = this.communicationService.getVideos$();
    const storedVideos = this.localStorageService.getListItems(LocalStorageConstants.VIDEOS);
    if (storedVideos && storedVideos.length > 0) {
      this.communicationService.setVideos(storedVideos);
    }
  }
}
