import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from '../../soc.model';
import { SocQuestion } from '../../soc-question/soc-question.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SocsService } from '../../socs.service';
import { SocQuestionService } from '../../soc-question/soc-question.service';
import { SocAnswerService } from '../../soc-question/soc-answer/soc-answer.service';
import { SocAnswer } from '../../soc-question/soc-answer/soc-answer.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit, OnDestroy {
  soc: Soc;
  question: SocQuestion;
  questions: SocQuestion[];
  answers: SocAnswer[];
  url: string;
  nextIndex: number;
  isLoading = false;
  isLoadingQuestion = false;
  isLoadingAnswer = false;
  private socSub: Subscription;
  private socQuestionsSub: Subscription;
  private socAnswerSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private socAnswersService: SocAnswerService,
    private questionService: QuestionService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
        return;
      }
      if (!paramMap.has('questionId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
        return;
      }
      this.isLoading = true;
      this.socSub = this.socsService
        .getSoc(paramMap.get('socId'))
        .subscribe(soc => {
          this.soc = soc;
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured',
            message: 'Could not load SOC',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['socs/tabs/search']);
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
                  this.router.navigate(['socs/tabs/search']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
      this.socQuestionsSub = this.socQuestionsService
        .fetchQuestions(paramMap.get('socId'))
        .subscribe(socQuestions => {
          this.questions = socQuestions;
          this.nextIndex = this.questions.findIndex(x => x.id === paramMap.get('questionId')) + 1;
          if (
            this.nextIndex
            >= this.questions.length
            || !this.questionService.isFirstRun()
          ) {
            if (this.questionService.getIncorrectQuestions().length === 0) {
              this.url = '/socs/results/' + paramMap.get('socId');
            } else {
              this.url =
                '/socs/start-soc/'
                + paramMap.get('socId')
                + '/question/'
                + this.questionService.getIncorrectQuestions()[0];
              this.questionService.removeIncorrectQuestion();
            }
          } else {
            this.url =
              '/socs/start-soc/'
              + paramMap.get('socId')
              + '/question/'
              + this.questions[this.questions.findIndex(x => x.id === paramMap.get('questionId')) + 1].id;
          }
        });
      this.isLoadingAnswer = true;
      this.socAnswerSub = this.socAnswersService
        .fetchAnswers(paramMap.get('socId'), paramMap.get('questionId'))
        .subscribe(socAnswers => {
          this.answers = this.shuffle(socAnswers);
          this.isLoadingAnswer = false;
        });
    });
  }

  checkAnswer(question: string, answer: boolean) {
    if (!answer) {
      this.questionService.addIncorrectQuestion(question);
      if (this.nextIndex
        === this.questions.length) {
          this.questionService.firstRunDone();
        }
    } else {
      if (this.questionService.isFirstRun()) {
        console.log(this.nextIndex + ' ' + this.questions.length);
        if (this.nextIndex
          === this.questions.length) {
            this.questionService.firstRunDone();
          }
        this.questionService.addScore();
      }
    }
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
