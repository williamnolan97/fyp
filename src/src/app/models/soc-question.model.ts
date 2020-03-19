import { SocAnswer } from './soc-answer.model';

export class SocQuestion {
    constructor(
      public id: string,
      public name: string,
      public answers: SocAnswer[],
    ) {}
}
