import { Component } from '@angular/core';
import { VideoList } from '../shared/video-list/video-list';

@Component({
  selector: 'app-student-dashboard',
  imports: [VideoList],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard {}
