/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: This service handles all the access
 *              to the back-end for all review details actions.
 */
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
  percent: number;
}

interface SocQuestionData {
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

  /**
   * Returns the SOCs from the back-end.
   *
   * @returns SOCs
   */
  get socs() {
    return this._socs.asObservable();
  }

  /**
   * Returns the questions from the back-end.
   *
   * @returns Questions
   */
  get questions() {
    return this._questions.asObservable();
  }

  /**
   * Fetches SOCs from back-end from a specified list of SOCs.
   *
   * @param string userId
   * @returns Subscribable
   */
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
              resData[key].percent,
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

  /**
   * Gets the IDs of all the SOCs the user has done.
   *
   * @param string userId
   * @returns Subscribable
   */
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

  /**
   * Gets specified questions from back-end.
   *
   * @param string[] questionIds
   * @param string socId
   * @returns Subscribable
   */
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
