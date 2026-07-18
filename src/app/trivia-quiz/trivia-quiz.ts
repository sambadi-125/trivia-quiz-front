import { Component, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { TriviaQuizService } from '../services/trivia-quiz-service';
import { QuizQuestion } from '../models/quiz-question';
import { PlayerAnswer } from '../models/player-answer';
import { PlayerAnswerValidationResponse } from '../models/player-answer-validation-response';

@Component({
  selector: 'app-trivia-quiz',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './trivia-quiz.html',
  styleUrl: './trivia-quiz.css',
})
export class TriviaQuiz implements OnInit {
  allQuestions: QuizQuestion[] = [];
  playerResponses: PlayerAnswer[] = [];
  playerResponseValidationResults = signal<PlayerAnswerValidationResponse[]>([]);
  quizForm: FormGroup;
  score: number = 0;
  showResults = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private triviaQuizService: TriviaQuizService,
  ) {
    this.quizForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.triviaQuizService.getQuestions().subscribe({
      next: (data) => {
        this.allQuestions = data;
        this.allQuestions.forEach((quizQuestion) => {
          this.quizForm.addControl(quizQuestion.id.toString(), new FormControl(''));
        });
      },
      error: (err) => {
        console.error('Failed to load questions', err);
      },
    });
  }

  onSubmit() {
    this.allQuestions.forEach((quizQuestion) => {
      this.playerResponses.push({
        questionId: quizQuestion.id,
        playerAnswer: this.getSelectedAnswerPerQuestion(quizQuestion),
      });
    });

    this.triviaQuizService.checkAnswers(this.playerResponses).subscribe({
      next: (data) => {
        this.playerResponseValidationResults.set(data);
      },
      error: (err) => {
        console.error('Failed to retrieve answers validation', err);
      },
    });

    this.showResults.set(true);
  }

  private getSelectedAnswerPerQuestion(quizQuestion: QuizQuestion): string {
    return this.quizForm.get(quizQuestion.id.toString())?.value;
  }

  getValidationResult(quizQuestion: QuizQuestion): PlayerAnswerValidationResponse | undefined {
    return this.playerResponseValidationResults().find(
      (response) => response.questionId === quizQuestion.id,
    );
  }
}
