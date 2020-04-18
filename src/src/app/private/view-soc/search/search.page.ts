/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the search page.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { UserData } from 'src/app/models/userData.model';
import { Subscription } from 'rxjs';
import { SocsService } from 'src/app/services/socs.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  loadedSocs: Soc[];
  listSocs: Soc[];
  userData: UserData;
  private socsSub: Subscription;
  private authSub: Subscription;
  isLoading = false;
  isLoadingSoc = false;
  isLoadingUser = false;
  isItemAvailable = false;

  constructor(
    private socsService: SocsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoadingSoc = true;
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listSocs = socs;
      this.isLoadingSoc = false;
    });
    this.isLoadingUser = true;
    this.authSub = this.authService.currUser.subscribe(userData => {
      this.userData = userData;
      this.isLoadingUser = false;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.socsService.fetchSocs().subscribe(() => {
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
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
