import { Routes } from '@angular/router';

import { Login } from './features/login/login/login';
import { StudentDashboard } from './features/student-dashboard/student-dashboard';
import { StudentVideoView } from './features/student-video-view/student-video-view/student-video-view';
import { TeacherDashboard } from './features/teacher-dashboard/teacher-dashboard/teacher-dashboard';
import { TeacherVideoView } from './features/teacher-video-view/teacher-video-view/teacher-video-view';
import { RouteConstants } from './shared/constants';

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
    component: TeacherVideoView,
  },
  {
    path: `${RouteConstants.VIDEO_VIEW}/student/:id`,
    component: StudentVideoView,
  },
];
