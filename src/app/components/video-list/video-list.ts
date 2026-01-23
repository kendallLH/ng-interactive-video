import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { VideoCard } from '../video-card/video-card';
import { Video } from '../../models/video';
import { LocalStorageConstants } from '../../shared/constants';
import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorage } from '../../services/local-storage/local-storage';

@Component({
  selector: 'app-video-list',
  imports: [AsyncPipe, VideoCard],
  templateUrl: './video-list.html',
  styleUrl: './video-list.scss',
})
export class VideoList implements OnInit {
  private localStorage = inject(LocalStorage);
  private communication = inject(CommunicationService);
  videos$: Observable<Video[]>;

  ngOnInit() {
    this.videos$ = this.communication.getVideos$().pipe(
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
    const storedVideos = this.localStorage.getListItems(LocalStorageConstants.VIDEOS);
    if (storedVideos && storedVideos.length > 0) {
      this.communication.setVideos(storedVideos);
    }
  }
}
