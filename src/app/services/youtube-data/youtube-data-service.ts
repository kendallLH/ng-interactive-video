import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeDataService {
  private http = inject(HttpClient);
  private youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';

  fetchVideoDetails(videoId: string): Observable<Object> {
    // Note: Storing the key in this way is bad practice
    // // Theoretically it shouldn't be done at all, realistically this key is restricted to localhost only and is temporary
    // // For simplicity purposes and the sake of the demo, I'm choosing to leave it as plain text temporarily
    const url = `${this.youtubeApiUrl}/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=AIzaSyBg-6hXNVZpvsNREVbUrlJ0B-EB80jHYwU`;
    return this.http.get(url);
  }
}
