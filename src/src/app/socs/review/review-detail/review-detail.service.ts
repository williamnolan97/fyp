import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { SocsService } from '../../socs.service';
import { BehaviorSubject } from 'rxjs';
import { Soc } from '../../soc.model';
import { SocQuestion } from '../../soc-question/soc-question.model';

interface SocData {
  description: string;
  questions: SocQuestion[];
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReviewDetailService {
  private socIds: string[];
  private _socs = new BehaviorSubject<Soc[]>([]);

  constructor(
    private http: HttpClient,
    private socsService: SocsService,
  ) { }

  get socs() {
    return this._socs.asObservable();
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
    console.log('henlo');
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
        console.log(socs);
        console.log(this.socIds);
      }));
  }
}
