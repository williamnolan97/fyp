import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { ResultsService } from 'src/app/services/results.service';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Soc } from 'src/app/models/soc.model';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { SocQuestion } from 'src/app/models/soc-question.model';

@Component({
  selector: 'app-view-result-detail',
  templateUrl: './view-result-detail.page.html',
  styleUrls: ['./view-result-detail.page.scss'],
})

export class ViewResultDetailPage implements OnInit, OnDestroy {
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;
  result: Result;
  soc: Soc;
  socId: string;
  userId: string;
  resultId: string;
  isLoading = false;
  private resultSub: Subscription;
  private socQuestionSub: Subscription;

  constructor(
    public resultService: ResultsService,
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
      this.resultSub = this.resultService.getResult(this.resultId, this.socId, this.userId).subscribe(result => {
        this.result = result;
        this.setDoughnut();
        this.isLoading = false;
      });
    });
  }

  setDoughnut() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [
          {
            label: '# of Votes',
            data: [this.result.result, this.result.total - this.result.result],
            backgroundColor: [
              'rgba(54, 162, 235)',
              'rgba(255, 99, 132)',
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
  }
}
