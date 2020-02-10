import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from './result.model';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
private _results = new BehaviorSubject<Result[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  get results() {
    return this._results.asObservable();
  }

  addResult(userId: string, socId: string, result: number, total: number, incorrect: string[]) {
    console.log('adding result');
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
}
