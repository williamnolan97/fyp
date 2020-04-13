/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Feedback object.
 */
export class Feedback {
    constructor(
        public id: string,
        public feedback: string,
        public senderName: string,
        public date: Date,
    ) {}
}
