import { PlayerAnswerItem } from './player-answer-item';

export interface PlayerAnswer {
  quizId: string;
  playerAnswers: PlayerAnswerItem[];
}
