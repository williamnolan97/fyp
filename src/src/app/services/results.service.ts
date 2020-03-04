import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../models/result.model';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface ResultData {
  result: number;
  total: number;
  incorrect: string[];
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
private _results = new BehaviorSubject<Result[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get results() {
    return this._results.asObservable();
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
          resultData.date
        );
      })
    );
  }
}
