export interface Annotation {
  id: string;
  className: string; // TODO is this needed if have videoid?
  dynamicContent: QuestionContent | NoteContent;
  headline: string;
  timestamp: number;
  videoId: string;
}

/**
 * Can be used for either a multiple choice question or a long form question
 * If there is only one item in the options arrray, it's long form
 * If there is a correct answer and more than one item in the options array, it's multiple choice
 */
export interface QuestionContent {
  options: string[];
  correctAnswer?: string;
}

export interface NoteContent {
  title: string;
  note: string;
}

export interface UserResponse {
  id: string;
  annotationId: string;
  studentId: string;
}
