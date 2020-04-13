/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: SOC Question object.
 */
import { SocAnswer } from './soc-answer.model';

export class SocQuestion {
    constructor(
      public id: string,
      public name: string,
      public answers: SocAnswer[],
    ) {}
}
