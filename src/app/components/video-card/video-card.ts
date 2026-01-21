import { Component, inject, Input, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

import { Video } from '../../models/video';
import { LocalStorageConstants, RouteConstants, UserType } from '../../shared/constants';
import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorage } from '../../services/local-storage/local-storage';
import { Utilities } from '../../services/utilities/utilities';

@Component({
  selector: 'app-video-card',
  imports: [CardModule, RouterLink],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCard implements OnInit {
  @Input() video: Video;
  private communication = inject(CommunicationService); // TODO: for testing only, delete later
  private localStorage = inject(LocalStorage);
  private router = inject(Router);
  private utilites = inject(Utilities);
  userType: string;
  userTypeEnum = UserType;

  ngOnInit() {
    this.userType = this.utilites.getUserTypeFromUrlPath();
  }

  // TODO - userType and route constants student / teacher are duplicates of each other

  viewVideo() {
    this.router.navigate([`/${RouteConstants.VIDEO_VIEW}`, this.userType, this.video.id]);
  }

  removeVideo(videoId: string) {
    const updatedVideos = this.localStorage.removeListItemById(
      LocalStorageConstants.VIDEOS,
      videoId,
    );
    this.communication.setVideos(updatedVideos);
  }
}
