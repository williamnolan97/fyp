/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the search leaderboard page.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from 'src/app/services/socs.service';
import { Subscription } from 'rxjs';
import { Soc } from 'src/app/models/soc.model';

@Component({
  selector: 'app-search-leaderboards',
  templateUrl: './search-leaderboards.page.html',
  styleUrls: ['./search-leaderboards.page.scss'],
})
export class SearchLeaderboardsPage implements OnInit, OnDestroy {
  private socSub: Subscription;
  loadedSocs: Soc[];
  listSocs: Soc[];
  isLoading = false;
  isItemAvailable = false;

  constructor(
    private socService: SocsService,
  ) { }

  ngOnInit() {
    this.socService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listSocs = socs;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.socService.fetchSocs().subscribe(() => {
      this.isLoading = false;
    });
  }

  initializeItems() {
    this.listSocs = this.loadedSocs;
  }

  filter(event: any) {
    this.initializeItems();
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.listSocs = this.listSocs.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }

}
