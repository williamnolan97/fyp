import { Injectable } from '@angular/core';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Soc } from 'src/app/models/soc.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { SocQuestion } from 'src/app/models/soc-question.model';

interface SocData {
  description: string;
  questions: SocQuestion[];
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocsService {
  private _socs = new BehaviorSubject<Soc[]>([]);

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  get socs() {
    return this._socs.asObservable();
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
          socData.questions
        );
      })
    );
  }

  addSoc(name: string, description: string, questions: SocQuestion[]) {
    let generatedId: string;
    const newSoc = new Soc(
      Math.random().toString(),
      name,
      description,
      questions
    );
    return this.http
      .post<{name: string}>('https://fyp-wnolan.firebaseio.com/soc.json', {
        ...newSoc,
        id: null
      })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.socs;
        }),
        take(1),
        tap(socs => {
          newSoc.id = generatedId;
          this._socs.next(socs.concat(newSoc));
        })
      );
  }
}
