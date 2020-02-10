import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../start-soc/question/question.service';
import { SocQuestionService } from '../soc-question/soc-question.service';
import { Subscription, throwError } from 'rxjs';
import { ResultsService } from './results.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, OnDestroy {
  score: number;
  incorrect: string[];
  incorrectIds: string[];
  totalQuestions: number;
  socQuestionSub: Subscription;
  userId: string;
  socId: string;

  constructor(
    private questionService: QuestionService,
    private socQuestionService: SocQuestionService,
    private resultsService: ResultsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
        return;
      }
      this.socId = paramMap.get('socId');
    });
    this.score = this.questionService.getScore();
    this.incorrect = this.questionService.getFinalIncorrectQuestionNames();
    this.incorrectIds = this.questionService.getFinalIncorrectQuestionIDs();
    this.socQuestionSub = this.socQuestionService.socQuestions.subscribe(questions => {
      this.totalQuestions = questions.length;
    });
    this.authService.userId.subscribe(id => {
      this.userId = id;
    });
    this.resultsService.addResult(
      this.userId,
      this.socId,
      this.score,
      this.totalQuestions,
      this.incorrectIds
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.socQuestionSub) {
      this.socQuestionSub.unsubscribe();
    }
  }

}
