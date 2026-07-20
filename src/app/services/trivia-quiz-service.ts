import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuizQuestion } from '../models/quiz-question';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { PlayerAnswer } from '../models/player-answer';
import { PlayerAnswerValidationResponse } from '../models/player-answer-validation-response';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class TriviaQuizService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/questions`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Failed to fetch quiz questions', err);
        return throwError(() => err);
      }),
    );
  }

  checkAnswers(playerAnswer: PlayerAnswer): Observable<PlayerAnswerValidationResponse[]> {
    return this.http
      .post<PlayerAnswerValidationResponse[]>(`${this.baseUrl}/checkanswers`, playerAnswer)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error("Failed to retrieve player's answers validation", err);
          return throwError(() => err);
        }),
      );
  }
}
