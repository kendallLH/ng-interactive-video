import { Injectable } from '@angular/core';
// import { Course } from '../../models/course';

// This demonstrates another way to add a model
// In this case I am keeping user inside of the service because it has a dedicated service
// for the models that do not, they will go in teh models folder
// this also helps with the new angular naming convention so that i don't have two files named
// user.ts (one as a servcie and one as a model) keeping it in the same place makes sense when possible
export interface UserObject {
  id: string;
  // courses: Course[]; // in real-world scenario you would have a course api and likely call the course api with the user id to get thier list of courses
  // well i guess there are two ways of doing it and this is one way, this way may make more sense in the way that a school would organize their students
  // likely students have a list of courses they are associated with
  type: UserType;
}

export enum UserType {
  Student = 'Student',
  Teacher = 'Teacher',
}

@Injectable({
  providedIn: 'root',
})
export class User {
  // Hardcoded users - would normally be retrieved through a typical auth flow
  private users: Map<string, UserObject> = new Map<string, UserObject>([
    [
      'teacher-1',
      {
        id: 'teacher-1',
        type: UserType.Teacher,
      },
    ],
    ['student-1', { id: 'student-1', type: UserType.Student }],
  ]);
  // "| undefined" is required to satisfy the return type of Map.get which is UserObject | undefined
  private currentUser: UserObject | undefined;

  setCurrentUser(userId: string) {
    this.currentUser = this.users.get(userId);
  }

  getCurrentUser(): UserObject | undefined {
    return this.currentUser;
  }
}
