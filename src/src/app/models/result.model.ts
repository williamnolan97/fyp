export class Result {
    constructor(
        public id: string,
        public result: number,
        public total: number,
        public incorrect: string[],
        public date: Date,
    ) {}
}
