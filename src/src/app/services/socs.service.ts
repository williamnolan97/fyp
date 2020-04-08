import { Injectable } from '@angular/core';
import { take, map, tap, delay, switchMap, filter } from 'rxjs/operators';

import { Soc } from 'src/app/models/soc.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { SocQuestion } from 'src/app/models/soc-question.model';
import { SocQuestionService } from './soc-question.service';
import { Feedback } from '../models/feedback.model';
import { Result } from '../models/result.model';

interface SocData {
  description: string;
  questions: SocQuestion[];
  name: string;
  percent: number;
}
interface ResultData {
  id: string;
  result: number;
  total: number;
  incorrect: string[];
  feedback: Feedback[];
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SocsService {
  private _socs = new BehaviorSubject<Soc[]>([]);
  private _pendingSocs = new BehaviorSubject<Soc[]>([]);
  socIds: string[];
  dates: Date[];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private socQuestionServive: SocQuestionService
  ) { }

  get socs() {
    return this._socs.asObservable();
  }

  get pendingSocs() {
    return this._pendingSocs.asObservable();
  }

  fetchSocs() {
    return this.http
      .get<{[key: string]: SocData}>(
        'https://fyp-wnolan.firebaseio.com/soc.json'
      )
      .pipe(map(resData => {
        const socs = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
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
        return socs;
      }),
      tap(socs => {
        this._socs.next(socs);
      })
    );
  }

  // fetchPendingSocs() {
  //   return this.http
  //     .get<{[key: string]: SocData}>(
  //       'https://fyp-wnolan.firebaseio.com/soc.json'
  //     )
  //     .pipe(map(resData => {
  //       const socs = [];
  //       for (const key in resData) {
  //         if (resData.hasOwnProperty(key)) {
  //           socs.push(new Soc(
  //             key,
  //             resData[key].name,
  //             resData[key].description,
  //             resData[key].percent,
  //             []
  //           )
  //           );
  //         }
  //       }
  //       var today = new Date();
  //       var sixMonths = new Date(today);
  //       sixMonths.setMonth(today.getMonth() - 6);
  //       console.log(today);
  //       console.log(sixMonths);
  //       socs.filter(soc => {
  //         return soc.
  //       })
  //       return socs;
  //     }),
  //     tap(socs => {
  //       this._socs.next(socs);
  //     })
  //   );
  // }

  getSoc(id: string) {
    return this.http
    .get<SocData>(
      `https://fyp-wnolan.firebaseio.com/soc/${id}.json`
    )
    .pipe(
      map(socData => {
        return new Soc(
          id,
          socData.name,
          socData.description,
          socData.percent,
          socData.questions
        );
      })
    );
  }

  createSoc(name: string, description: string, percent: number, questions: any[]) {
    let generatedId: string;
    const newSoc = new Soc(
      Math.random().toString(),
      name,
      description,
      percent,
      []
    );
    return this.http
      .post<{name: string}>('https://fyp-wnolan.firebaseio.com/soc.json', {
        ...newSoc,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          questions.forEach(question => {
              this.socQuestionServive
                .createQuestion(generatedId, question.questionName, question.answers)
                .subscribe();
            }
          );
          return this.socs;
        }),
        take(1),
        tap(socs => {
          newSoc.id = generatedId;
          this._socs.next(socs.concat(newSoc));
        })
      );
  }

  updateSoc(socId: string, name: string, description: string, percent: number, questions: any[]) {
    let generatedId: string;
    const newSoc = new Soc(
      Math.random().toString(),
      name,
      description,
      percent,
      []
    );
    return this.http
      .put<{name: string}>(`https://fyp-wnolan.firebaseio.com/soc/${socId}.json`, {
        ...newSoc,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          questions.forEach(question => {
              if (question.questionId === null) {
                this.socQuestionServive
                .createQuestion(socId, question.questionName, question.answers)
                .subscribe();
              } else {
                this.socQuestionServive
                .updateQuestion(socId, question.questionId, question.questionName, question.answers)
                .subscribe();
              }
            }
          );
          return this.socs;
        }),
        take(1),
        tap(socs => {
          newSoc.id = generatedId;
          this._socs.next(socs.concat(newSoc));
          this.fetchSocs().subscribe();
        })
      );
  }

  deleteSOC(socId: string) {
    return this.http
      .delete(`https://fyp-wnolan.firebaseio.com/soc/${socId}.json`)
      .pipe(
        switchMap(() => {
          return this.socs;
        }),
        take(1),
        tap(socs => {
          this._socs.next(socs.filter(b => b.id !== socId));
        })
      );
  }

  getPendingSocs(userId: string) {
    this.getPendingSocIds(userId).subscribe();
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
      this._pendingSocs.next(socs);
    })
  );
  }

  getPendingSocIds(userId: string) {
    return this.http
      .get<{[key: string]: any}>(
        `https://fyp-wnolan.firebaseio.com/result/${userId}.json`
      )
      .pipe(map(resData => {
        const socs = [];
        var today = new Date();
        var sixMonths = new Date(today);
        sixMonths.setMonth(today.getMonth() - 6);
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            this.dates = [];
            // tslint:disable-next-line: forin
            for (const key2 in resData[key]) {
                this.dates.push(new Date(resData[key][key2].date));
            }
            this.dates = this.dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            if (this.dates[0].getTime() < sixMonths.getTime()) {
              socs.push(key);
            }
          }
        }
        return socs;
      }),
      tap(socs => {
        this.socIds = socs;
      }));
  }
}
