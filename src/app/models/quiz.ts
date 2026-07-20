import { QuizQuestion } from './quiz-question';

export interface Quiz {
  quizId: string;
  quizQuestions: QuizQuestion[];
}
