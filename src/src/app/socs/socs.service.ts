import { Injectable } from '@angular/core';
import { take, map, tap, delay } from 'rxjs/operators';

import { Soc } from './soc.model';
import { BehaviorSubject } from 'rxjs';
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})
export class SocsService {
  private _socs = new BehaviorSubject<Soc[]>([
    new Soc(
      's1',
      'Health and Safety',
      'Health and Safety Station Observation Checklist',
      'Completed',
      ),
    new Soc(
      's2',
      'Security',
      'Security Station Observation Checklist',
      'Completed',
      ),
    new Soc(
      's3',
      'Food Safety',
      'Food Safety Station Observation Checklist',
      'Todo'
      ),
  ]);

  get socs() {
    return this._socs.asObservable();
  }

  constructor() { }

  getSoc(id: string){
    return this.socs.pipe(
      take(1),
      map(socs => {
        return {...socs.find(s => s.id === id)};
    }));
  }

  addSoc(title: string, description: string) {
    const newSoc = new Soc(
      Math.random().toString(),
      title,
      description,
      'Todo'
    );
    return this.socs.pipe(
      take(1),
      delay(1000),
      tap(socs => {
        this._socs.next(socs.concat(newSoc));
      })
    );
  }
}
