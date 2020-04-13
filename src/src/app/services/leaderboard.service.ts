/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: This service handles all the access
 *              to the back-end for all leaderboard actions.
 */
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Leaderboard } from '../models/Leaderboard.model';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap, map } from 'rxjs/operators';

interface LeaderboardData {
  id: string;
  name: string;
  score: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private _leaderboard = new BehaviorSubject<Leaderboard[]>([]);
  oldRecord: Leaderboard;


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Returns the leaderboard from the back-end.
   *
   * @return Leaderboard
   */
  get leaderboard() {
    return this._leaderboard.asObservable();
  }

  /**
   * Compares new leaderboard score with old leaderboard score and stores best score.
   *
   * @param string socId
   * @param string name
   */
  compareScores(socId: string, name: string) {
    this.fetchLeaderboard(socId).subscribe(leaderboard => {
      if (leaderboard.find(x => x.name === name) !== undefined) {
        this.oldRecord = leaderboard.find(x => x.name === name);
      }
    });
  }

  /**
   * Adds new leaderboard record to back-end.
   *
   * @param string socId
   * @param number score
   * @returns Subscribable
   */
  addLeaderboard(socId: string, score: number) {
    let generateId: string;
    let name;
    let uid;
    this.authService.currUser.subscribe(user => {
      if (user) {
        name = user.fname + ' ' + user.lname;
        uid = user.id;
      }
    });
    const newLeaderboard = new Leaderboard (
      Math.random().toString(),
      name,
      score,
      new Date()
    );
    if (this.oldRecord === undefined) {
      return this.http
        .put<{name: string}>(`https://fyp-wnolan.firebaseio.com/leaderboard/${socId}/${uid}.json`, {
          ...newLeaderboard,
          id: null,
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
    } else if (this.oldRecord.score < score && this.oldRecord) {
      return this.http
        .put<{name: string}>(`https://fyp-wnolan.firebaseio.com/leaderboard/${socId}/${uid}.json`, {
          ...newLeaderboard,
          id: null,
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
    } else {
      return this.http
        .put<{name: string}>(`https://fyp-wnolan.firebaseio.com/leaderboard/${socId}/${uid}.json`, {
          ...this.oldRecord,
          id: null,
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
  }

  /**
   * Fetches the SOC leaderboard from the back-end.
   *
   * @param string socId
   * @returns Subscribable
   */
  fetchLeaderboard(socId: string) {
    return this.http
    .get<LeaderboardData>(
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
          return parseFloat(b.score) - parseFloat(a.score);
        });
        return leaderboard;
      }),
      tap(leaderboard => {
        this._leaderboard.next(leaderboard);
      })
    );
  }
}
