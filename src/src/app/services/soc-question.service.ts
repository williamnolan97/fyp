import { Injectable } from '@angular/core';
import { SocAnswer } from '../models/soc-answer.model';
import { SocQuestion } from '../models/soc-question.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface SocQuestionData {
  socId: string;
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
    private http: HttpClient
  ) { }

  get socQuestions() {
    return this._socQuestions.asObservable();
  }

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
              resData[key].socId,
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

  getQuestion(socId: string, questionId: string) {
    return this.http
    .get<SocQuestionData>(
      `https://fyp-wnolan.firebaseio.com/soc/${socId}/questions/${questionId}.json`
    )
    .pipe(
      map(questionData => {
        return new SocQuestion(
          questionId,
          questionData.socId,
          questionData.name,
          questionData.answers
        );
      })
    );
  }

  addSocQuestion(socId: string, name: string) {
    let generatedId: string;
    const newSocQuestion = new SocQuestion(
      Math.random().toString(),
      socId,
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
          return this.socQuestions;
        }),
        take(1),
        tap(socQuestions => {
          newSocQuestion.id = generatedId;
          this._socQuestions.next(socQuestions.concat(newSocQuestion));
        })
      );
  }
}
