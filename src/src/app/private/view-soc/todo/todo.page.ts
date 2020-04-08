import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { SocsService } from 'src/app/services/socs.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, OnDestroy {
  loadedSocs: Soc[];
  listedLoadedPlaces: Soc[];
  private socsSub: Subscription;
  private authSub: Subscription;
  isLoading = false;
  isLoadingUser = false;
  userData: UserData;

  constructor(
    private socsService: SocsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // console.log(navigator.userAgent);
    // const ua = navigator.userAgent;
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
    //    console.log('mobile');
    // } else if (/Chrome/i.test(ua)) {
    //   console.log('chrome');
    // } else {
    //       console.log('desktop');
    // }
    this.isLoadingUser = true;
    this.authSub = this.authService.currUser.subscribe(userData => {
      this.userData = userData;
      this.isLoadingUser = false;
    });
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listedLoadedPlaces = this.loadedSocs.slice(1);
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
