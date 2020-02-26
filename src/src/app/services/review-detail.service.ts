import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Soc } from '../models/soc.model';
import { SocQuestion } from '../models/soc-question.model';
import { SocAnswer } from '../models/soc-answer.model';

interface SocData {
  description: string;
  questions: SocQuestion[];
  name: string;
}

interface SocQuestionData {
  socId: string;
  answers: SocAnswer[];
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReviewDetailService {
  private socIds: string[];
  private _socs = new BehaviorSubject<Soc[]>([]);
  private _questions = new BehaviorSubject<SocQuestion[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  get socs() {
    return this._socs.asObservable();
  }

  get questions() {
    return this._questions.asObservable();
  }

  getSocs(userId: string) {
    this.getSocIds(userId).subscribe();
    return this.http
    .get<{[key: string]: SocData}>(
      'https://fyp-wnolan.firebaseio.com/soc.json'
    )
    .pipe(map(resData => {
      const socs = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          if (this.socIds.indexOf(key) !== -1) {
            socs.push(new Soc(
              key,
              resData[key].name,
              resData[key].description,
              []
            )
            );
          }
        }
      }
      return socs;
    }),
    tap(socs => {
      this._socs.next(socs);
    })
  );
  }

  getSocIds(userId: string) {
    return this.http
      .get<{[key: string]: string[]}>(
        `https://fyp-wnolan.firebaseio.com/result/${userId}.json`
      )
      .pipe(map(resData => {
        const socs = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            socs.push(key);
          }
        }
        return socs;
      }),
      tap(socs => {
        this.socIds = socs;
      }));
  }

  getQuestions(questionIds: string[], socId: string) {
    return this.http
    .get<{[key: string]: SocQuestionData}>(
      `https://fyp-wnolan.firebaseio.com/soc/${socId}/questions.json`
    )
    .pipe(map(resData => {
      const questions = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          if (questionIds.indexOf(key) !== -1) {
            questions.push(new SocQuestion(
              key,
              resData[key].socId,
              resData[key].name,
              resData[key].answers
            )
            );
          }
        }
      }
      return questions;
    }),
    tap(questions => {
      this._questions.next(questions);
    })
  );
  }
}
