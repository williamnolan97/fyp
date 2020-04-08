export class UserData {
    constructor(
        public id: string,
        public email: string,
        public fname: string,
        public lname: string,
        public role: number,
        public socs: string[],
    ) {}
}
