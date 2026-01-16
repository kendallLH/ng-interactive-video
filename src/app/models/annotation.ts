export interface Annotation {
  id: string;
  content: QuestionContent | NoteContent;
  timestamp: number;
  videoId: string;
}

/**
 * Can be used for either a multiple choice question or a long form question
 * If there is only one item in the options arrray, it's long form
 * If there is a correct answer and more than one item in the options array, it's multiple choice
 */
export interface QuestionContent {
  question: string;
  options: string[];
  correctAnswer?: string;
}

export interface NoteContent {
  title: string;
  note: string;
}
