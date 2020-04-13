/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Result object.
 */
import { Feedback } from './feedback.model';

export class Result {
    constructor(
        public id: string,
        public result: number,
        public total: number,
        public incorrect: string[],
        public feedback: Feedback[],
        public date: Date,
    ) {}
}
