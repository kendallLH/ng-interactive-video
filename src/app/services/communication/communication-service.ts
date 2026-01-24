import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Video } from '../../models/video';
import { Annotation } from '../../models/annotation';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private annotations$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  private videoPlayer$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private videos$: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);

  setAnnotations(annotations: Annotation[]) {
    this.annotations$.next(annotations);
  }

  getAnnotations$(): Observable<Annotation[]> {
    return this.annotations$.asObservable();
  }

  setVideoPlayer(player: any) {
    this.videoPlayer$.next(player);
  }

  getVideoPlayer$(): Observable<any> {
    return this.videoPlayer$.asObservable();
  }

  setVideos(videos: Video[]) {
    this.videos$.next(videos);
  }

  getVideos$(): Observable<Video[]> {
    return this.videos$.asObservable();
  }
}
