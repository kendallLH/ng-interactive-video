import { Course } from './course';

export interface Video {
  id: string;
  course: Course;
  status: Status;
  thumbnail: string;
  title: string;
}

export enum Status {
  TeacherInProgress = 'TEACHER_IN_PROGRESS',
  StudentInProgress = 'STUDENT_IN_PROGRESS',
  TeacherCompleted = 'TEACHER_COMPLETED',
  StudentCompleted = 'STUDENT_COMPLETED',
}
