import { Result } from './result.model';

export class AllResults {
    constructor(
        public socId: string,
        public results: Result[],
    ) {}
}
