import { Component } from '@angular/core';

import { AddVideo } from '../add-video/add-video';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [AddVideo],
  templateUrl: './teacher-dashboard.html',
  styleUrl: './teacher-dashboard.scss',
})
export class TeacherDashboard {}
