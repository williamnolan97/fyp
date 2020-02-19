import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  incorrectQuestions: string[] = [];
  finalIncorrectNames: string[] = [];
  finalIncorrectIDs: string[] = [];
  firstRun = true;
  score = 0;

  constructor() { }

  reset() {
    this.incorrectQuestions = [];
    this.finalIncorrectIDs = [];
    this.finalIncorrectNames = [];
    this.firstRun = true;
    this.score = 0;
  }

  addIncorrectQuestion(questionID: string, questionName: string) {
    this.incorrectQuestions.push(questionID);
    if (!this.finalIncorrectIDs.includes(questionID)) {
      this.finalIncorrectIDs.push(questionID);
      this.finalIncorrectNames.push(questionName);
    }
  }

  getIncorrectQuestions() {
    return this.incorrectQuestions;
  }

  getFinalIncorrectQuestionIDs() {
    return this.finalIncorrectIDs;
  }

  getFinalIncorrectQuestionNames() {
    return this.finalIncorrectNames;
  }

  removeIncorrectQuestion() {
    this.incorrectQuestions.shift();
  }

  isFirstRun() {
    return this.firstRun;
  }

  firstRunDone() {
    this.firstRun = false;
  }

  addScore() {
    this.score = ++this.score;
  }

  getScore() {
    return this.score;
  }

}
