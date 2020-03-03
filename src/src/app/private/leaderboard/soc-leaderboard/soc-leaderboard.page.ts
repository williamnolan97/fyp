import { Component, OnInit } from '@angular/core';
import { Leaderboard } from 'src/app/models/Leaderboard.model';
import { Subscription } from 'rxjs';
import { ResultsService } from 'src/app/services/results.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Soc } from 'src/app/models/soc.model';
import { SocsService } from 'src/app/services/socs.service';

@Component({
  selector: 'app-soc-leaderboard',
  templateUrl: './soc-leaderboard.page.html',
  styleUrls: ['./soc-leaderboard.page.scss'],
})
export class SocLeaderboardPage implements OnInit {
  leaderboard: Leaderboard[];
  soc: Soc;
  private resultSub: Subscription;
  private socSub: Subscription;
  isLoading = false;
  isLoadingSoc = false;

  constructor(
    private resultService: ResultsService,
    private socService: SocsService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.resultSub = this.resultService
        .leaderboard
        .subscribe(leaderboard => {
          this.leaderboard = leaderboard;
    });
    this.isLoadingSoc = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      this.socSub = this.socService
        .getSoc(paramMap.get('socId'))
        .subscribe(soc => {
          this.soc = soc;
          this.isLoadingSoc = false;
        });
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      this.resultSub = this.resultService
        .fetchLeaderboard(paramMap.get('socId'))
        .subscribe(() => {
          this.isLoading = false;
        });
    });
  }

}
