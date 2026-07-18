import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaQuiz } from './trivia-quiz';

describe('TriviaQuiz', () => {
  let component: TriviaQuiz;
  let fixture: ComponentFixture<TriviaQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriviaQuiz],
    }).compileComponents();

    fixture = TestBed.createComponent(TriviaQuiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
