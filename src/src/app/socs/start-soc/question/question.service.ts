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

  addIncorrectQuestion(questionID: string, questionName) {
    this.incorrectQuestions.push(questionID);
    this.finalIncorrectIDs.push(questionID);
    this.finalIncorrectNames.push(questionName);
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
    console.log(this.finalIncorrectIDs);
  }

  addScore() {
    this.score = ++this.score;
  }

  getScore() {
    return this.score;
  }

}
