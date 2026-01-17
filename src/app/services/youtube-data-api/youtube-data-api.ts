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
    const url = `${this.youtubeApiUrl}/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=AIzaSyD4LFgVg5FxTnBT2mvxozbIOE3mwqy4cp0`;
    return this.http.get(url);
  }
}
