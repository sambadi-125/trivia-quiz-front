import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuizQuestion } from '../models/quiz-question';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { PlayerAnswer } from '../models/player-answer';
import { PlayerAnswerValidationResponse } from '../models/player-answer-validation-response';

@Injectable({
  providedIn: 'root',
})
export class TriviaQuizService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.baseUrl}/api/questions`).pipe(
      // TODO: remove console log when finished
      tap((data) => console.log(JSON.stringify(data))),
      catchError((err: HttpErrorResponse) => {
        console.error('Failed to fetch quiz questions', err);
        return throwError(() => err);
      }),
    );
  }

  checkAnswers(playerAnswers: PlayerAnswer[]): Observable<PlayerAnswerValidationResponse[]> {
    return this.http
      .post<PlayerAnswerValidationResponse[]>(`${this.baseUrl}/api/checkanswers`, playerAnswers)
      .pipe(
        // TODO: remove console log when finished
        tap((data) => console.log(JSON.stringify(data))),
        catchError((err: HttpErrorResponse) => {
          console.error("Failed to retrieve player's answers validation", err);
          return throwError(() => err);
        }),
      );
  }
}
