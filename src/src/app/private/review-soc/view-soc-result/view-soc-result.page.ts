import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';
import { SocsService } from 'src/app/services/socs.service';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-view-soc-result',
  templateUrl: './view-soc-result.page.html',
  styleUrls: ['./view-soc-result.page.scss'],
})
export class ViewSocResultPage implements OnInit, OnDestroy {
  isLoading = false;
  soc: Soc;
  results: Result[];
  percents: number[];
  socId: string;
  userId: string;
  private socSub: Subscription;
  private resultsSub: Subscription;

  constructor(
    private socService: SocsService,
    private resultsService: ResultsService,
    private navCtrl: NavController,
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
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }

}
