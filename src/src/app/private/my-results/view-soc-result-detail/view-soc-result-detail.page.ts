import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { Soc } from 'src/app/models/soc.model';
import { SocQuestion } from 'src/app/models/soc-question.model';
import { Subscription } from 'rxjs';
import { ResultsService } from 'src/app/services/results.service';
import { ReviewDetailService } from 'src/app/services/review-detail.service';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-view-soc-result-detail',
  templateUrl: './view-soc-result-detail.page.html',
  styleUrls: ['./view-soc-result-detail.page.scss'],
})
export class ViewSocResultDetailPage implements OnInit, OnDestroy {
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;
  result: Result;
  soc: Soc;
  socQuestions: SocQuestion[];
  socId: string;
  userId: string;
  resultId: string;
  isLoading = false;
  private resultSub: Subscription;
  private reviewDetailSub: Subscription;
  feedback: Feedback[];

  constructor(
    public resultService: ResultsService,
    public reviewDetailService: ReviewDetailService,
    public socQuestionService: SocQuestionService,
    public route: ActivatedRoute,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('socId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      if (!paramMap.get('userId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      if (!paramMap.get('resultId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      this.resultId = paramMap.get('resultId');
      this.socId = paramMap.get('socId');
      this.userId = paramMap.get('userId');
      this.getResults();
    });
  }

  getResults() {
    this.resultSub = this.resultService.getResult(this.resultId, this.socId, this.userId).subscribe(result => {
      this.result = result;
      console.log(this.result.feedback);
      const feedback = [];
      for (const key in this.result.feedback) {
        if (this.result.feedback.hasOwnProperty(key)) {
          feedback.push(new Feedback(
            key,
            this.result.feedback[key].feedback,
            this.result.feedback[key].senderName,
            this.result.feedback[key].date,
          ));
        }
      }
      this.feedback = feedback.sort((a, b) => {
        return b.date.localeCompare(a.date) || 0;
      });
      this.setDoughnut();
      this.getQuestions();
      this.isLoading = false;
    });
  }

  getQuestions() {
    if (this.result.incorrect !== undefined) {
      this.reviewDetailSub = this.reviewDetailService.getQuestions(this.result.incorrect, this.socId).subscribe(questions => {
        this.socQuestions = questions;
      });
    }
  }
  setDoughnut() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [
          {
            data: [this.result.result, this.result.total - this.result.result],
            backgroundColor: [
              '#00ff00',
              '#ff0000',
            ],
          }
        ]
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
      }
    });
  }

  ngOnDestroy() {
    if (this.resultSub) {
      this.resultSub.unsubscribe();
    }
    if (this.reviewDetailSub) {
      this.reviewDetailSub.unsubscribe();
    }
  }
}
