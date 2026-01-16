import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { take } from 'rxjs/operators';

import { InteractiveCard } from '../interactive-card/interactive-card';
import { VideoPlayer } from '../video-player/video-player';
import { CommunicationService } from '../../../services/communication/communication-service';
import { Observable } from 'rxjs';
import { LocalStorage } from '../../../services/local-storage/local-storage';
import { LocalStorageConstants } from '../../../shared/constants';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-video-view',
  imports: [AsyncPipe, ButtonModule, InteractiveCard, VideoPlayer],
  templateUrl: './video-view.html',
  styleUrl: './video-view.scss',
})
export class VideoView {
  // TODO - service naming is inconsistent!!
  private communicationService = inject(CommunicationService);
  private localStorage = inject(LocalStorage);
  annotations$: Observable<any>;

  isAddAnnotation: WritableSignal<boolean>;
  timestamp: number;

  ngOnInit() {
    // Connect to the signal that tells us if add annotation box should be open or closed
    this.isAddAnnotation = this.communicationService.getShowInteractiveCard();

    // Connect to annotations$ observable stream
    this.annotations$ = this.communicationService.getAnnotations$();
    // Get the current annotations
    const storedAnnotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
    if (storedAnnotations && storedAnnotations.length > 0) {
      // Send the current annotations down the observable stream
      this.communicationService.setAnnotations(storedAnnotations);
    }
  }

  addAnnotation() {
    // Open the card for the user to input values
    this.communicationService.setShowInteractiveCard(true);
    // Pause the video player
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        player.pause();
        this.timestamp = player.currentTime();

        // show form overlayed over video
        // for now use css positioning, but maybe upgrade to videojs plugin
        // https://www.npmjs.com/package/videojs-overlay
        // https://codepen.io/fealaer/pen/RwbKeye
      });
  }
}
