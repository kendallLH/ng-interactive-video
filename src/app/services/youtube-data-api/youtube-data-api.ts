import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeDataApi {
  private http = inject(HttpClient);
  private youtubeApiUrl = 'https://www.googleapis.com/youtube/v3';

  fetchVideoDetails(videoId: string): any {
    // TODO: Define proper return type
    // Note: Storing the key in this way is generally bad practice
    // // This one is okay because it's restricted and temporary
    // // however, for a production app it would not be stored in plain text on the front end
    const url = `${this.youtubeApiUrl}/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=AIzaSyBg-6hXNVZpvsNREVbUrlJ0B-EB80jHYwU`;
    return this.http.get(url);
  }
}
