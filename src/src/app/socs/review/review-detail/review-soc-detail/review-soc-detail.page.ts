import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from 'src/app/services/socs.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Soc } from 'src/app/models/soc.model';
import { Result } from 'src/app/models/result.model';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-review-soc-detail',
  templateUrl: './review-soc-detail.page.html',
  styleUrls: ['./review-soc-detail.page.scss'],
})
export class ReviewSocDetailPage implements OnInit, OnDestroy {
  isLoading = false;
  soc: Soc;
  results: Result[];
  socId: string;
  userId: string;
  private socSub: Subscription;
  private resultsSub: Subscription;

  constructor(
    private socService: SocsService,
    private resultsService: ResultsService,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.get('socId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      if (!paramMap.get('userId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      this.socId = paramMap.get('socId');
      this.userId = paramMap.get('userId');
      this.socSub = this.socService.getSoc(this.socId).subscribe(soc => {
        this.soc = soc;
      });
      this.resultsSub = this.resultsService
        .results
        .subscribe(results => {
          this.results = results;
        });
    });

  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.resultsService
      .fetchResults(this.userId, this.socId)
      .subscribe(() => {
        this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.resultsSub) {
      this.resultsSub.unsubscribe();
    }
    if (this.resultsSub) {
      this.resultsSub.unsubscribe();
    }
  }

}
