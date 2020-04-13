/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: User object.
 */
export class User {
    role: any;
    constructor(
        public id: string,
        public email: string,
        private _token: string,
        private tokenExperationDate: Date
    ) {}

    get token() {
        if (!this.tokenExperationDate || this.tokenExperationDate <= new Date()) {
            return null;
        }
        return this._token;
    }
}
