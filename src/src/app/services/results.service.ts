import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../models/result.model';
import { Leaderboard } from '../models/Leaderboard.model';
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
private _leaderboard = new BehaviorSubject<Leaderboard[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get results() {
    return this._results.asObservable();
  }

  get leaderboard() {
    return this._leaderboard.asObservable();
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

  addLeaderboard(socId: string, score: number) {
    console.log('adding leaderboard');
    let generateId: string;
    let name = 'testing';
    this.authService.currUser.subscribe(user => {
      if (user.fname && user.lname) {
        name = user.fname + ' ' + user.lname;
      }
    });
    const newLeaderboard = new Leaderboard (
      Math.random().toString(),
      name,
      score,
      new Date()
    );
    return this.http
      .post<{name: string}>(`https://fyp-wnolan.firebaseio.com/leaderboard/${socId}.json`, {
        ...newLeaderboard,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.leaderboard;
        }),
        take(1),
        tap(leaderboard => {
          newLeaderboard.id = generateId;
          this._leaderboard.next(leaderboard.concat(newLeaderboard));
        })
      );
  }

  fetchLeaderboard(socId: string) {
    return this.http
    .get<ResultData>(
      `https://fyp-wnolan.firebaseio.com/leaderboard/${socId}.json`
    )
    .pipe(
      map(resData => {
        const leaderboard = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            leaderboard.push(new Leaderboard(
              key,
              resData[key].name,
              resData[key].score,
              resData[key].date,
            )
            );
          }
        }
        leaderboard.sort((a, b) => {
          return b.score > a.score ||
          b.name.localeCompare(a.name) || 0;
        });
        return leaderboard;
      }),
      tap(leaderboard => {
        this._leaderboard.next(leaderboard);
      })
    );
  }
}
