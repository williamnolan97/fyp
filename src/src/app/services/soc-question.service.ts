/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: This service handles all the access
 *              to the back-end for all SOC Questions actions.
 */
import { Injectable } from '@angular/core';
import { SocAnswer } from '../models/soc-answer.model';
import { SocQuestion } from '../models/soc-question.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SocAnswerService } from './soc-answer.service';

interface SocQuestionData {
  answers: SocAnswer[];
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocQuestionService {
  private _socQuestions = new BehaviorSubject<SocQuestion[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private socAnswersService: SocAnswerService
  ) { }

  /**
   * Returns questions from back-end.
   *
   * @returns Questions
   */
  get socQuestions() {
    return this._socQuestions.asObservable();
  }

  /**
   * Fetches questions from a specified SOC from the back-end.
   *
   * @param string socId
   * @returns Subscribable
   */
  fetchQuestions(socId: string) {
    return this.http
      .get<{[key: string]: SocQuestionData}>(
        `https://fyp-wnolan.firebaseio.com/soc/${socId}/questions.json`
      )
      .pipe(map(resData => {
        const socQuestions = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            socQuestions.push(new SocQuestion(
              key,
              resData[key].name,
              resData[key].answers
            )
            );
          }
        }
        return socQuestions;
      }),
      tap(socQuestions => {
        this._socQuestions.next(socQuestions);
      })
    );
  }

  /**
   * Gets a specified question from the back-end.
   *
   * @param string socId
   * @param string questionId
   * @returns Subscribable
   */
  getQuestion(socId: string, questionId: string) {
    return this.http
    .get<SocQuestionData>(
      `https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}.json`
    )
    .pipe(
      map(questionData => {
        return new SocQuestion(
          questionId,
          questionData.name,
          questionData.answers
        );
      })
    );
  }

  /**
   * Creates a question and sends it to the back-end.
   *
   * @param string socId
   * @param string name
   * @param any[] answers
   * @returns Subscribable
   */
  createQuestion(socId: string, name: string, answers: any[]) {
    console.log(name);
    let generatedId: string;
    let isAnswer: boolean;
    const newSocQuestion = new SocQuestion(
      Math.random().toString(),
      name,
      []
    );
    return this.http
      .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/soc/${socId}/questions.json`, {
        ...newSocQuestion,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          answers.forEach(answer => {
            if (answers.indexOf(answer) === 0) {
              isAnswer = true;
            } else {
              isAnswer = false;
            }
            this.socAnswersService
                .createAnswer(socId, generatedId, answer.answerName, isAnswer)
                .subscribe();
          });
          return this.socQuestions;
        }),
        take(1),
        tap(socQuestions => {
          newSocQuestion.id = generatedId;
          this._socQuestions.next(socQuestions.concat(newSocQuestion));
        })
      );
  }

  /**
   * Updates a question.
   *
   * @param string socId
   * @param string questionId
   * @param string name
   * @param any[] answers
   * @returns Subscribable
   */
  updateQuestion(socId: string, questionId: string, name: string, answers: any[]) {
    let generatedId: string;
    let isAnswer: boolean;
    const newSocQuestion = new SocQuestion(
      Math.random().toString(),
      name,
      []
    );
    return this.http
      .put<{name: string}>(`https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}.json`, {
        ...newSocQuestion,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          answers.forEach(answer => {
            if (answers.indexOf(answer) === 0) {
              isAnswer = true;
            } else {
              isAnswer = false;
            }
            if (answer.answerId === null) {
              this.socAnswersService
              .createAnswer(socId, questionId, answer.answerName, isAnswer)
              .subscribe();
            } else {
              this.socAnswersService
                .updateAnswer(socId, questionId, answer.answerId, answer.answerName, isAnswer)
                .subscribe();
            }
          });
          return this.socQuestions;
        }),
        take(1),
        tap(socQuestions => {
          newSocQuestion.id = generatedId;
          this._socQuestions.next(socQuestions.concat(newSocQuestion));
        })
      );
  }

  /**
   * Deletes a question from the back-end.
   *
   * @param string socId
   * @param string questionId
   * @returns Subscribable
   */
  deleteQuestion(socId: string, questionId: string) {
    return this.http.delete(`https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}.json`)
      .pipe(switchMap(() => {
        return this.socQuestions;
      }),
      take(1),
      tap(questions => {
        this._socQuestions.next(questions.filter(b => b.id !== questionId));
        this.fetchQuestions(socId).subscribe();
      }));
  }
}
