import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../start-soc/question/question.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  score: number;

  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.score = this.questionService.getScore();
  }

}
