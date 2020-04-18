/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: SOC object.
 */
import { SocQuestion } from './soc-question.model';

export class Soc {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public percent: number,
      public questions: SocQuestion[]
    ) {}
}