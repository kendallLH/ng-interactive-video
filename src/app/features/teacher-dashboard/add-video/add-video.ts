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
  classOptions = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Calculus 2', 'Korean 1', 'Korean 2'];
  selectedCourse: string = '';

  onSubmit() {
    const videoId = this.utilityService.getVideoIdFromYouTubeUrl(this.inputUrl);
    this.youtubeDataService.fetchVideoDetails(videoId).subscribe((data: any) => {
      const thumbnail = data.items[0].snippet.thumbnails.medium.url;
      const title = data.items[0].snippet.title;

      // Hard-coding the course for now
      // In production a list of course objects would be provided from an api
      // We would determine the correct course by comparing the user selection to the api's data
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
