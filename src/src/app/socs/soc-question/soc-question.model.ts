import { SocAnswer } from './soc-answer/soc-answer.model';

export class SocQuestion {
    constructor(
      public id: string,
      public socId: string,
      public name: string,
      public answers: SocAnswer[],
    ) {}
}
