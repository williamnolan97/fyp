import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from '../socs.service';
import { Soc } from '../soc.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserData } from 'src/app/auth/userData.model';

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

  constructor(
    private socsService: SocsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listedLoadedSocs = this.loadedSocs.slice(1);
    });
    this.authSub = this.authService.currUser.subscribe(userData => {
      this.userData = userData;
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
