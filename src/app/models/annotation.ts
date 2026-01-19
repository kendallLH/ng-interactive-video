/**
 * Can be used for either a multiple choice question, long form question, or a note
 * If there is only one item in the options arrray and no correct answer, it's long form
 * If there is a correct answer and more than one item in the options array, it's multiple choice
 * If it's a note one or both of the headline and answerOptions[0] can be used to
 */
export interface Annotation {
  id: string;
  correctAnswer?: string;
  headline: string;
  answerOptions: string[];
  timestamp: number;
  type: AnnotationType;
  videoId: string;
}

export enum AnnotationType {
  MultipleChoice = 'Multiple Choice',
  LongForm = 'Long Form',
  Note = 'Note',
}

export interface UserResponse {
  id: string;
  annotationId: string;
  studentId: string;
}
