/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: This service handles all actions
 *              for the take SOC process.
 */
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

  /**
   * Resets take SOC process.
   */
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

  /**
   * Adds incorrect questions to list
   *
   * @param string questionID
   * @param string questionName
   */
  addIncorrectQuestion(questionID: string, questionName: string) {
    this.incorrectQuestions.push(questionID);
    if (!this.finalIncorrectIDs.includes(questionID)) {
      this.finalIncorrectIDs.push(questionID);
      this.finalIncorrectNames.push(questionName);
    }
  }

  /**
   * Returns list of incorrect question IDs.
   *
   * @returns List of incorrect question IDs
   */
  getIncorrectQuestions() {
    return this.incorrectQuestions;
  }


  /**
   * Returns final list of incorrect question IDs.
   *
   * @returns Final list of incorrect question IDs
   */
  getFinalIncorrectQuestionIDs() {
    return this.finalIncorrectIDs;
  }

  /**
   * Returns final list of incorrect question names.
   *
   * @returns Final list of incorrect question names
   */
  getFinalIncorrectQuestionNames() {
    return this.finalIncorrectNames;
  }

  /**
   * Removes incorrect question from list.
   */
  removeIncorrectQuestion() {
    this.incorrectQuestions.shift();
  }

  /**
   * Return whether its the users first run through the take SOC process.
   *
   * @returns True/False whether its the users first run through the take SOC process
   */
  isFirstRun() {
    return this.firstRun;
  }

  /**
   * Sets first run as done.
   */
  firstRunDone() {
    this.firstRun = false;
  }

  /**
   * Increments the result. Increments streak index.
   */
  addResult() {
    this.result = ++this.result;
    this.streak = ++this.streak;
  }

  /**
   * Returns the result.
   *
   * @returns Result.
   */
  getResult() {
    return this.result;
  }

  /**
   * Increments progression for progress bar.
   */
  addProgress() {
    this.progress++;
  }

  /**
   * Returns the current progress.
   *
   * @returns Current progress
   */
  getProgress() {
    return this.progress;
  }

  /**
   * Adds to the users score taking the time and streak bonus into account.
   *
   * @param number bonus
   */
  addScore(bonus: number) {
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
  }


  /**
   * Returns score.
   *
   * @returns Score
   */
  getScore() {
    return this.score;
  }

  /**
   * Resets the user's streak.
   */
  resetStreak() {
    this.streak = 0;
  }

}
