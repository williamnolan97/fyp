export class UserData {
    constructor(
        public id: string,
        public email: string,
        public fname: string,
        public lname: string,
        public fullName: string,
        public userId: string,
        public socs: string[],
    ) {}
}
