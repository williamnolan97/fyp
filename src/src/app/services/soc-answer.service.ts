import { Injectable } from '@angular/core';
import { SocAnswer } from '../models/soc-answer.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';

interface SocAnswerData {
  name: string;
  isAnswer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SocAnswerService {
  private _socAnswers = new BehaviorSubject<SocAnswer[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  get socAnswers() {
    return this._socAnswers.asObservable();
  }

  addSocAnswer(socId: string, questionId: string, name: string, isAnswer: boolean) {
    let generatedId: string;
    const newSocAnswer = new SocAnswer(
      Math.random().toString(),
      name,
      isAnswer
    );
    return this.http
      .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}/answers.json`, {
        ...newSocAnswer,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.socAnswers;
        }),
        take(1),
        tap(socAnswers => {
          newSocAnswer.id = generatedId;
          this._socAnswers.next(socAnswers.concat(newSocAnswer));
        })
      );
  }

  fetchAnswers(socId: string, questionId: string) {
    return this.http
      .get<{[key: string]: SocAnswerData}>(
        `https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}/answers.json`
      )
      .pipe(map(resData => {
        const socQuestions = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            socQuestions.push(new SocAnswer(
              key,
              resData[key].name,
              resData[key].isAnswer
            )
            );
          }
        }
        return socQuestions;
      }),
      tap(socAnswers => {
        this._socAnswers.next(socAnswers);
      })
    );
  }
  createAnswer(socId: string, questionId: string, name: string, isAnswer: boolean) {
    let generatedId: string;
    const newSocAnswer = new SocAnswer(
      Math.random().toString(),
      name,
      isAnswer
    );
    return this.http
      .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}/answers.json`, {
        ...newSocAnswer,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.socAnswers;
        }),
        take(1),
        tap(socAnswers => {
          newSocAnswer.id = generatedId;
          this._socAnswers.next(socAnswers.concat(newSocAnswer));
        })
      );
  }
}
