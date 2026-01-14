import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  // TODO> any type
  private videoPlayer$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  setVideoPlayer(player: any) {
    // TODO: any type
    console.log('set video player', player);
    this.videoPlayer$.next(player);
  }

  getVideoPlayer$(): Observable<any> {
    // TODO: any type
    console.log('get video player', this.videoPlayer$);
    return this.videoPlayer$.asObservable();
  }
}
