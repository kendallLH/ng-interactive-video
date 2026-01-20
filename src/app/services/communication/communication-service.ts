import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Video } from '../../models/video';
import { Annotation } from '../../models/annotation';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  // Observables
  private annotations$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  private videos$: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]); // TODO: make a videlist type

  // TODO> any type
  private videoPlayer$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  // Signals
  // private showInteractiveCard = signal(false);

  /** Observables */

  setAnnotations(annotations: Annotation[]) {
    this.annotations$.next(annotations);
  }

  getAnnotations$(): Observable<Annotation[]> {
    return this.annotations$.asObservable();
  }

  getVideos$(): Observable<Video[]> {
    return this.videos$.asObservable();
  }

  setVideos(videos: Video[]) {
    this.videos$.next(videos);
  }

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

  /** Signals */

  // setShowInteractiveCard(shouldShow: boolean) {
  //   this.showInteractiveCard.set(shouldShow);
  // }

  // getShowInteractiveCard(): WritableSignal<boolean> {
  //   return this.showInteractiveCard;
  // }
}
