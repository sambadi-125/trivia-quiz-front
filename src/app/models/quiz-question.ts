export interface QuizQuestion {
  id: number;
  type: string;
  category: string;
  question: string;
  answerChoices: string[];
}
