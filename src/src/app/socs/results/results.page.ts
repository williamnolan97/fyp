import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../start-soc/question/question.service';
import { SocQuestionService } from '../soc-question/soc-question.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit, OnDestroy {
  score: number;
  incorrect: string[];
  totalQuestions: number;
  socQuestionSub: Subscription;

  constructor(
    private questionService: QuestionService,
    private socQuestionServer: SocQuestionService,
  ) { }

  ngOnInit() {
    this.score = this.questionService.getScore();
    this.incorrect = this.questionService.getFinalIncorrectQuestionNames();
    this.socQuestionSub = this.socQuestionServer.socQuestions.subscribe(questions => {
      this.totalQuestions = questions.length;
    });
  }

  ngOnDestroy() {
    if (this.socQuestionSub) {
      this.socQuestionSub.unsubscribe();
    }
  }

}
