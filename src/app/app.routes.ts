import { Routes } from '@angular/router';

import { Login } from './components/login/login/login';
import { StudentDashboard } from './components/student-dashboard/student-dashboard/student-dashboard';
import { TeacherDashboard } from './components/teacher-dashboard/teacher-dashboard/teacher-dashboard';
import { VideoPlayer } from './components/video-player/video-player/video-player';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard,
  },
  {
    path: 'teacher-dashboard',
    component: TeacherDashboard,
  },
  {
    path: 'player/:userType',
    component: VideoPlayer,
  },
];
