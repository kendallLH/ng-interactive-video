import { Routes } from '@angular/router';

import { Login } from './components/login/login/login';
import { StudentDashboard } from './components/student/student-dashboard/student-dashboard';
import { TeacherDashboard } from './components/teacher/teacher-dashboard/teacher-dashboard';
import { VideoView } from './components/video-view/video-view/video-view';
import { RouteConstants } from './shared/constants';
import { StudentVideoView } from './components/student/student-video-view/student-video-view/student-video-view';

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
    path: `${RouteConstants.VIDEO_VIEW}/teacher/:id`,
    component: VideoView,
  },
  {
    path: `${RouteConstants.VIDEO_VIEW}/student/:id`,
    component: StudentVideoView,
  },
];
