import { SocQuestion } from './soc-question.model';

export class Soc {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public questions: SocQuestion[]
    ) {}
}
