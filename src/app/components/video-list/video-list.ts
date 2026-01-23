import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { VideoCard } from '../video-card/video-card';
import { Video } from '../../models/video';
import { LocalStorageConstants } from '../../shared/constants';
import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorageService } from '../../services/local-storage/local-storage-service';

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
    this.videos$ = this.communicationService.getVideos$().pipe(
      map((videos) => {
        // if (videos.length === 0) {
        //   videos = this.localStorage.getListItems(LocalStorageConstants.VIDEOS);
        // }
        // const filteredVideos = videos.filter((videos) =>
        //   // return if class id matches one of the students class ids that they're taking
        //   // return if status of the video is teachercompleted
        // );
        // return filteredVideos;

        return videos;
      }),
    );
    const storedVideos = this.localStorageService.getListItems(LocalStorageConstants.VIDEOS);
    if (storedVideos && storedVideos.length > 0) {
      this.communicationService.setVideos(storedVideos);
    }
  }
}
