/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the soc result page.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { ResultsService } from 'src/app/services/results.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LeaderboardService } from 'src/app/services/leaderboard.service';

@Component({
  selector: 'app-soc-result',
  templateUrl: './soc-result.page.html',
  styleUrls: ['./soc-result.page.scss'],
})
export class SocResultPage implements OnInit, OnDestroy {
  score: number;
  result: number;
  incorrect: string[];
  incorrectIds: string[];
  totalQuestions: number;
  socQuestionSub: Subscription;
  userId: string;
  socId: string;
  name: string;

  constructor(
    private questionService: QuestionService,
    private socQuestionService: SocQuestionService,
    private resultsService: ResultsService,
    private leaderService: LeaderboardService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('view-soc');
        return;
      }
      this.socId = paramMap.get('socId');
      this.result = this.questionService.getResult();
      this.incorrect = this.questionService.getFinalIncorrectQuestionNames();
      this.incorrectIds = this.questionService.getFinalIncorrectQuestionIDs();
      this.score = this.questionService.getScore();
    });
    this.socQuestionSub = this.socQuestionService.socQuestions.subscribe(questions => {
      this.totalQuestions = questions.length;
    });
    this.authService.userId.subscribe(id => {
      this.userId = id;
    });
    this.resultsService.addResult(
      this.userId,
      this.socId,
      this.result,
      this.totalQuestions,
      this.incorrectIds,
    ).subscribe();
    this.leaderService.addLeaderboard(
      this.socId,
      this.score,
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.socQuestionSub) {
      this.socQuestionSub.unsubscribe();
    }
  }

}
