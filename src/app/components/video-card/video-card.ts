import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

import { CommunicationService } from '../../services/communication/communication-service';
import { LocalStorage } from '../../services/local-storage/local-storage';
import { LocalStorageConstants } from '../../shared/constants';

@Component({
  selector: 'app-video-card',
  imports: [CardModule, RouterLink],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCard {
  @Input() video: any; // TODO: define proper type
  private localStorage = inject(LocalStorage);
  private communication = inject(CommunicationService); // TODO: for testing only, delete later

  constructor() {}

  removeVideo(videoId: string) {
    const updatedVideos = this.localStorage.removeListItemById(
      LocalStorageConstants.VIDEOS,
      videoId,
    );

    // need to update the page here or something
    // make sur you update the observable whenever local storage is updated
    this.communication.setVideos(updatedVideos);
  }
}
