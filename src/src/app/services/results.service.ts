import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../models/result.model';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Feedback } from '../models/feedback.model';

interface ResultData {
  result: number;
  total: number;
  incorrect: string[];
  feedback: Feedback[];
  date: Date;
}

interface FeedbackData {
  feedback: string;
  senderName: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
private _results = new BehaviorSubject<Result[]>([]);
private _feedback = new BehaviorSubject<Feedback[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get results() {
    return this._results.asObservable();
  }

  get feedback() {
    return this._feedback.asObservable();
  }

  fetchResults(userId: string, socId: string) {
    return this.http
      .get<{[key: string]: ResultData}>(
        `https://fyp-wnolan.firebaseio.com/result/${userId}/${socId}.json`
      )
      .pipe(map(resData => {
        const results = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            results.push(new Result(
              key,
              resData[key].result,
              resData[key].total,
              resData[key].incorrect,
              resData[key].feedback,
              resData[key].date
            ));
          }
        }
        results.sort((a, b) => {
          return b.date.localeCompare(a.date) || 0;
        });
        return results;
      }),
      tap(results => {
        this._results.next(results);
      })
      );
  }

  addResult(userId: string, socId: string, result: number, total: number, incorrect: string[]) {
    let generateId: string;
    const newResult = new Result(
      Math.random().toString(),
      result,
      total,
      incorrect,
      [],
      new Date()
    );
    return this.http
      .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/result/${userId}/${socId}.json`, {
        ...newResult,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.results;
        }),
        take(1),
        tap(results => {
          newResult.id = generateId;
          this._results.next(results.concat(newResult));
        })
      );
  }

  getResult(id: string, socId: string, userId: string) {
    return this.http
    .get<ResultData>(
      `https://fyp-wnolan.firebaseio.com/result/${userId}/${socId}/${id}.json`
    )
    .pipe(
      map(resultData => {
        return new Result(
          id,
          resultData.result,
          resultData.total,
          resultData.incorrect,
          resultData.feedback,
          resultData.date
        );
      })
    );
  }

  addFeedback(feedback: string, senderName: string, userId: string, socId: string, resultId: string) {
    let generateId: string;
    const newFeedback = new Feedback(
      Math.random().toString(),
      feedback,
      senderName,
      new Date()
    );
    return this.http
    .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/result/${userId}/${socId}/${resultId}/feedback.json`, {
      ...newFeedback,
      id: null
    })
    .pipe(
      switchMap(resData => {
        generateId = resData.name;
        return this.feedback;
      }),
      take(1),
      tap(feedback => {
        newFeedback.id = generateId;
        this._feedback.next(feedback.concat(newFeedback));
      })
    );
  }

  getResultObject(userId: string) {
    return this.http
    .get(
      `https://fyp-wnolan.firebaseio.com/result/${userId}.json`
    )
    .pipe(
      map(resultData => {
        return resultData;
      })
    );
  }
}
