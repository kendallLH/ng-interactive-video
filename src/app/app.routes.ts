import { Routes } from '@angular/router';

import { Login } from './components/login/login/login';
import { StudentDashboard } from './components/student/student-dashboard/student-dashboard';
import { TeacherDashboard } from './components/teacher/teacher-dashboard/teacher-dashboard';
import { VideoView } from './components/video-view/video-view/video-view';
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
    path: `${RouteConstants.VIDEO_VIEW}/:userType/:id`,
    component: VideoView,
  },
];
