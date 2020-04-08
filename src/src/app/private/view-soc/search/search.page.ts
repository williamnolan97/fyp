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
  listedLoadedSocs: Soc[];
  userData: UserData;
  private socsSub: Subscription;
  private authSub: Subscription;
  isLoading = false;
  isLoadingUser = false;

  constructor(
    private socsService: SocsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listedLoadedSocs = this.loadedSocs.slice(1);
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

  ngOnDestroy() {
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
