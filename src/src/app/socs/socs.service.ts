import { Injectable } from '@angular/core';

import { Soc } from './soc.model';

@Injectable({
  providedIn: 'root'
})
export class SocsService {
  private _socs: Soc[] = [
    new Soc(
      's1',
      'Health and Safety',
      'Health and Safety Station Observation Checklist'
      ),
    new Soc(
      's2',
      'Security',
      'Security Station Observation Checklist'
      ),
    new Soc(
      's3',
      'Food Safety',
      'Food Safety Station Observation Checklist'
      ),
  ];

  get socs() {
    return [...this._socs];
  }
  constructor() { }

  getSoc(id: string){
    return {...this._socs.find(s => s.id === id)};
  }
}
