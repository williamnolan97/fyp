import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  incorrectQuestions: string[] = [];
  finalIncorrectNames: string[] = [];
  finalIncorrectIDs: string[] = [];
  firstRun = true;
  result = 0;
  progress = 0;
  score = 0;
  streak = 0;
  streakPoints: number[];

  constructor() {
    this.streakPoints = [50, 75, 125, 200, 300, 450, 700];
  }

  reset() {
    this.incorrectQuestions = [];
    this.finalIncorrectIDs = [];
    this.finalIncorrectNames = [];
    this.firstRun = true;
    this.result = 0;
    this.progress = 0;
    this.score = 0;
    this.streak = 0;
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

  addResult() {
    this.result = ++this.result;
    this.streak = ++this.streak;
  }

  getResult() {
    return this.result;
  }

  addProgress() {
    this.progress++;
  }

  getProgress() {
    return this.progress;
  }

  addScore(bonus: number) {
    console.log(this.score);
    console.log(this.streak);
    if (bonus > 0) {
      this.score += Math.round(bonus);
    }
    if (this.streak > 0) {
      if (this.streak <= this.streakPoints.length) {
        this.score += this.streakPoints[this.streak - 1];
      } else {
        this.score += this.streakPoints[this.streakPoints.length - 1];
      }
    }
    this.score += 100;
    console.log(this.score);
    console.log(this.streak);
  }

  getScore() {
    return this.score;
  }

  resetStreak() {
    this.streak = 0;
  }

}
