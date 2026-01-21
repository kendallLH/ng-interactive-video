import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { Course } from '../../../models/course';
import { Status, Video } from '../../../models/video';
import { LocalStorageConstants, RouteConstants } from '../../../shared/constants';
import { Utilities } from '../../../services/utilities/utilities';
import { YoutubeDataApi } from '../../../services/youtube-data-api/youtube-data-api';
import { LocalStorage } from '../../../services/local-storage/local-storage';

@Component({
  selector: 'app-add-video',
  imports: [ButtonModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.scss',
})
export class AddVideo {
  private localStorage = inject(LocalStorage);
  private router = inject(Router);
  private utilities = inject(Utilities);
  private youtubeDataApi = inject(YoutubeDataApi);
  inputUrl: string = '';
  // put this in a mocks folder or something
  classOptions = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Calculus 2', 'Korean 1', 'Korean 2'];
  selectedCourse: string = '';

  onSubmit() {
    const videoId = this.utilities.getVideoIdFromYouTubeUrl(this.inputUrl);
    this.youtubeDataApi.fetchVideoDetails(videoId).subscribe((data: any) => {
      const thumbnail = data.items[0].snippet.thumbnails.medium.url;
      const title = data.items[0].snippet.title;

      // TODO - video shoudl not be submitted until annotations are done, but teachers need to be able to see in progress videos
      // hardcoded for now
      // todo - use the selected class name to find the right course from the course list
      // in theory course list would be grabbed on init of user and stored in a service
      // for now it's hard coded, but mimics if we had grabbed it from an api on load of the user's account
      const course: Course = {
        id: 1,
        name: this.selectedCourse,
        teacherId: 'teacher-1',
      };
      // Update local storage with the new item
      // TODO: prevent duplicates
      const videoDetails: Video = {
        id: videoId,
        course,
        status: Status.TeacherInProgress,
        title,
        thumbnail,
      };
      this.localStorage.addListItem(LocalStorageConstants.VIDEOS, videoDetails);
    });
    this.router.navigate([`/${RouteConstants.VIDEO_VIEW}/teacher`, videoId]);
  }

  setClassOptions() {}
}
