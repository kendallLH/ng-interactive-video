import { Component } from '@angular/core';

import { AddVideo } from '../add-video/add-video';
import { VideoList } from '../../video-list/video-list';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [AddVideo, VideoList],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.scss',
})
export class TeacherDashboard {}
