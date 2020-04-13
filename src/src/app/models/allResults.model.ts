/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: All Results object.
 */
import { Result } from './result.model';

export class AllResults {
    constructor(
        public socId: string,
        public results: Result[],
    ) {}
}
