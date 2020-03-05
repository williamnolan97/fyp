import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { SocQuestion } from 'src/app/models/soc-question.model';
import { SocAnswer } from 'src/app/models/soc-answer.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SocsService } from 'src/app/services/socs.service';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { SocAnswerService } from 'src/app/services/soc-answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-soc-question',
  templateUrl: './soc-question.page.html',
  styleUrls: ['./soc-question.page.scss'],
})
export class SocQuestionPage implements OnInit, OnDestroy {
  disabled = false;
  toggle: boolean[] = [];
  soc: Soc;
  question: SocQuestion;
  questions: SocQuestion[];
  answers: SocAnswer[];
  url: string;
  nextIndex: number;
  isLoading = false;
  isLoadingQuestion = false;
  isLoadingAnswer = false;
  isLoadingProgress = false;
  private socSub: Subscription;
  private socQuestionsSub: Subscription;
  private socAnswerSub: Subscription;
  answered: boolean;
  correct: boolean;
  correctAnswer: string;
  progress: number;
  now: Date;
  timeAnswered: Date;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private socAnswersService: SocAnswerService,
    private questionService: QuestionService,
    private leaderService: LeaderboardService,
    private authService: AuthService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('view-soc');
        return;
      }
      if (!paramMap.has('questionId')) {
        this.navCtrl.navigateBack('view-soc');
        return;
      }
      this.isLoading = true;
      this.socSub = this.socsService
        .getSoc(paramMap.get('socId'))
        .subscribe(soc => {
          this.soc = soc;
          this.progress = this.questionService.getProgress();
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured',
            message: 'Could not load SOC',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['view-soc']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
      this.isLoadingQuestion = true;
      this.socQuestionsSub = this.socQuestionsService
        .getQuestion(paramMap.get('socId'), paramMap.get('questionId'))
        .subscribe(socQuestion => {
          this.question = socQuestion;
          this.isLoadingQuestion = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured',
            message: 'Could not load question',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['view-soc']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
      this.isLoadingProgress = true;
      this.socQuestionsSub = this.socQuestionsService
        .fetchQuestions(paramMap.get('socId'))
        .subscribe(socQuestions => {
          this.questions = socQuestions;
          this.isLoadingProgress = false;
        });
      this.isLoadingAnswer = true;
      this.socAnswerSub = this.socAnswersService
        .fetchAnswers(paramMap.get('socId'), paramMap.get('questionId'))
        .subscribe(socAnswers => {
          this.answers = this.shuffle(socAnswers);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.answers.length; i++) {
            this.toggle.push(true);
          }
          this.correctAnswer = this.answers[this.answers.findIndex(x => x.isAnswer === true)].name;
          this.isLoadingAnswer = false;
        });
      this.now = new Date();
      this.now.setSeconds(this.now.getSeconds() + 5);
    });
  }

  runAll(questionID: string, questionName: string, answer: boolean, index: number) {
    if (!this.disabled) {
      this.selectionMade(index);
      this.checkAnswer(questionID, questionName, answer);
    }
  }

  selectionMade(index: number) {
    this.toggle[index] = !this.toggle[index];
    this.disabled = true;
  }

  reset() {
    this.answered = false;
    this.correct = null;
    this.disabled = false;
    this.toggle = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.answers.length; i++) {
      this.toggle.push(true);
    }
  }

  checkAnswer(questionID: string, questionName: string, answer: boolean) {
    this.timeAnswered = new Date();
    this.nextIndex = this.questions.findIndex(x => x.id === this.question.id) + 1;
    if (!answer) {
      this.correct = false;
      this.questionService.addIncorrectQuestion(questionID, questionName);
      if (this.nextIndex
        === this.questions.length) {
          this.questionService.firstRunDone();
        }
    } else {
      this.questionService.addProgress();
      this.progress = this.questionService.getProgress();
      this.correct = true;
      if (this.questionService.isFirstRun()) {
        if (this.nextIndex
          === this.questions.length) {
            this.questionService.firstRunDone();
          }
        this.questionService.addResult();
        this.questionService.addScore((this.now.getTime() - this.timeAnswered.getTime()) / 10);
      }
    }
    if (this.questionService.isFirstRun()) {
      this.url =
        '/take-soc/'
        + this.soc.id
        + '/'
        + this.questions[this.nextIndex].id;
    } else {
      if (this.questionService.getIncorrectQuestions().length === 0) {
        this.authService.currUser.subscribe(user => {
          this.leaderService.compareScores(this.soc.id, user.fname + user.lname);
        });
        this.url =
          '/take-soc/soc-result/' +
          this.soc.id;
      } else {
        this.url =
          '/take-soc/'
          + this.soc.id
          + '/'
          + this.questionService.getIncorrectQuestions()[0];
        this.questionService.removeIncorrectQuestion();
      }
    }
    this.answered = true;
  }

  shuffle(array: SocAnswer[]) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
    if (this.socQuestionsSub) {
      this.socQuestionsSub.unsubscribe();
    }
    if (this.socAnswerSub) {
      this.socAnswerSub.unsubscribe();
    }
  }

}
