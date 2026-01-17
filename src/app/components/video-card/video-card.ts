import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

import { Video } from '../../models/video';
import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorage } from '../../services/local-storage/local-storage';
import { LocalStorageConstants, RouteConstants } from '../../shared/constants';

@Component({
  selector: 'app-video-card',
  imports: [CardModule, RouterLink],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCard {
  @Input() video: Video; // TODO: define proper type
  private communication = inject(CommunicationService); // TODO: for testing only, delete later
  private localStorage = inject(LocalStorage);
  private router = inject(Router);

  constructor() {}

  viewVideo() {
    console.log('view video');
    // if Student (right now there is no distinction for this view so this will always be a student)
    this.router.navigate([`/${RouteConstants.VIDEO_VIEW}`, RouteConstants.STUDENT, this.video.id]);

    // if teacher
  }

  removeVideo(videoId: string) {
    const updatedVideos = this.localStorage.removeListItemById(
      LocalStorageConstants.VIDEOS,
      videoId,
    );
    this.communication.setVideos(updatedVideos);
  }
}
