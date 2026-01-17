import { Course } from './course';

export interface Video {
  id: string;
  course: Course;
  thumbnail: string;
  title: string;
}
