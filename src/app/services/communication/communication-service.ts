import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Video } from '../../models/video';
import { Annotation } from '../../models/annotation';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private annotations$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  // TODO> any type
  private videoPlayer$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private videos$: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);

  setAnnotations(annotations: Annotation[]) {
    this.annotations$.next(annotations);
  }

  getAnnotations$(): Observable<Annotation[]> {
    return this.annotations$.asObservable();
  }

  setVideoPlayer(player: any) {
    // TODO: any type
    this.videoPlayer$.next(player);
  }

  getVideoPlayer$(): Observable<any> {
    // TODO: any type
    return this.videoPlayer$.asObservable();
  }

  setVideos(videos: Video[]) {
    this.videos$.next(videos);
  }

  getVideos$(): Observable<Video[]> {
    return this.videos$.asObservable();
  }
}
