import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  incorrectQuestions: string[] = [];
  finalIncorrect: string[] = [];
  firstRun = true;
  score = 0;

  constructor() { }

  addIncorrectQuestion(question: string) {
    this.incorrectQuestions.push(question);
    this.finalIncorrect.push(question);
  }

  getIncorrectQuestions() {
    return this.incorrectQuestions;
  }

  removeIncorrectQuestion() {
    this.incorrectQuestions.shift();
  }

  isFirstRun() {
    return this.firstRun;
  }

  firstRunDone() {
    this.firstRun = false;
    console.log(this.finalIncorrect);
  }

  addScore() {
    this.score = ++this.score;
  }

  getScore() {
    return this.score;
  }

}
