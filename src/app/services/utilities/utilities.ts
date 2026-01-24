import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage-service';
import { mockAnnotations, mockVideos } from '../../shared/mocks';
import { LocalStorageConstants, UserType } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class Utilities {
  private localStorageService = inject(LocalStorageService);

  getSecondsFromHHMMSS(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  getUserTypeFromUrlPath(): string {
    const urlPath = window.location.pathname;
    return urlPath.indexOf(UserType.Student) !== -1 ? UserType.Student : UserType.Teacher;
  }

  getVideoIdFromYouTubeUrl(url: string): string {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1); // Remove leading '/'
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      return urlObj.searchParams.get('v') || '';
    }

    // if it included "shorts" in the route then it may not have the v= param
    // https://www.youtube.com/shorts/KXzj5RP6D9U
    return '';
  }

  getVideoIdFromBrowserUrl(): string {
    const pathname = window.location.pathname;
    let segments = pathname.split('/');
    segments = segments.filter((segment) => segment.length > 0);
    return segments.pop() || '';
  }

  prePopulateData() {
    this.localStorageService.setItem(LocalStorageConstants.VIDEOS, mockVideos);
    this.localStorageService.setItem(LocalStorageConstants.ANNOTATIONS, mockAnnotations);
  }
}
