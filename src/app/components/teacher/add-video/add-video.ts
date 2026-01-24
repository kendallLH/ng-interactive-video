// External Imports
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
// Internal Imports
import { Course } from '../../../models/course';
import { Status, Video } from '../../../models/video';
import { LocalStorageConstants, RouteConstants } from '../../../shared/constants';
import { UtilityService } from '../../../services/utility/utility-service';
import { YoutubeDataService } from '../../../services/youtube-data/youtube-data-service';
import { LocalStorageService } from '../../../services/local-storage/local-storage-service';

@Component({
  selector: 'app-add-video',
  imports: [ButtonModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.scss',
})
export class AddVideo {
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private utilityService = inject(UtilityService);
  private youtubeDataService = inject(YoutubeDataService);
  inputUrl: string = '';
  // TODO - put this in a mocks folder or something
  classOptions = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Calculus 2', 'Korean 1', 'Korean 2'];
  selectedCourse: string = '';

  onSubmit() {
    const videoId = this.utilityService.getVideoIdFromYouTubeUrl(this.inputUrl);
    this.youtubeDataService.fetchVideoDetails(videoId).subscribe((data: any) => {
      const thumbnail = data.items[0].snippet.thumbnails.medium.url;
      const title = data.items[0].snippet.title;

      // TODO - video shoudl not be submitted until annotations are done, but teachers need to be able to see in progress videos
      // hardcoded for now
      // in theory course list would be grabbed on init of user and stored in a service
      // for now it's hard coded, but mimics if we had grabbed it from an api on load of the user's account
      const course: Course = {
        id: 1,
        name: this.selectedCourse,
        teacherId: 'teacher-1',
      };
      const videoDetails: Video = {
        id: videoId,
        course,
        status: Status.TeacherInProgress,
        title,
        thumbnail,
      };
      this.localStorageService.addListItem(LocalStorageConstants.VIDEOS, videoDetails);
    });
    this.router.navigate([`/${RouteConstants.VIDEO_VIEW}/teacher`, videoId]);
  }
}
