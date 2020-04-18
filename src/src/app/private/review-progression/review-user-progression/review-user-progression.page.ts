/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the review user progression page.
 */
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ResultsService } from 'src/app/services/results.service';
import { Subscription } from 'rxjs';
import { ReviewDetailService } from 'src/app/services/review-detail.service';
import { Soc } from 'src/app/models/soc.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-review-user-progression',
  templateUrl: './review-user-progression.page.html',
  styleUrls: ['./review-user-progression.page.scss'],
})
export class ReviewUserProgressionPage implements OnInit, OnDestroy {
  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;

  private lineChart: Chart;
  reviewDetailSub: Subscription;
  userSub: Subscription;
  socs: Soc[];
  user: UserData;
  dataset: object[] = [];
  newData: object[] = [];
  colors: string[] = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#f57f17',
                      '#ff1744', '#d500f9', '#2979ff', '#00c853', '#bf360c', '#5d4037',
                      '#546e7a', '#1a237e', '#006064', '#33691e', '#e65100', '#ffd600',
                      ]; // ADD MORE COLORS
  isLoading = false;

  constructor(
    public route: ActivatedRoute,
    private navCtrl: NavController,
    public resultService: ResultsService,
    public reviewDetailService: ReviewDetailService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('userId')) {
        this.navCtrl.navigateBack('/review-progression');
        return;
      }
      this.isLoading = true;
      this.userSub = this.authService
        .getUser(paramMap.get('userId'))
        .subscribe(user => {
          this.user = user;
          this.isLoading = false;
        });
      this.reviewDetailSub = this.reviewDetailService.getSocs(paramMap.get('userId')).subscribe(socs => {
        console.log(socs);
        this.setChartData(paramMap.get('userId'), socs);
      });
    });
  }

  setChartData(userId: string, socs: Soc[]) {
    this.resultService.getResultObject(userId).subscribe(object => {
      const test = object;
      let index = 0;
      for (const soc in test) {
        if (test.hasOwnProperty(soc)) {
          this.newData = [];
          for (const result in test[soc]) {
            if (test[soc].hasOwnProperty(result)) {
              this.newData.push(
                {
                  x: test[soc][result].date,
                  y: test[soc][result].result / test[soc][result].total * 100
                }
              );
            }
          }
          this.dataset.push(
            {
              data: this.newData,
              label: socs[index].name,
              borderColor: this.colors[index],
              fill: false
            }
          );
          index++;
        }
      }
      this.setChart();
    });
  }

  setChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        datasets: this.dataset
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'time',
                  time: {
                      unit: 'month',
                      displayFormats: {
                        day: 'MMM YY'
                      }
                  }
              }]
          },
          title: {
            display: true,
            text: this.user.fname + '\'s Progression'
          },
          elements: {
            line: {
                tension: 0
            }
          },
          maintainAspectRatio: false,
          responsive: true,
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.reviewDetailSub) {
      this.reviewDetailSub.unsubscribe();
    }
  }
}
