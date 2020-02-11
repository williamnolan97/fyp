import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from 'src/app/auth/userData.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.page.html',
  styleUrls: ['./review-detail.page.scss'],
})
export class ReviewDetailPage implements OnInit, OnDestroy {
  user: UserData;
  userSub: Subscription;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userId')) {
        this.navCtrl.navigateBack('/socs/review');
        return;
      }
      this.isLoading = true;
      this.userSub = this.authService
        .getUser(paramMap.get('userId'))
        .subscribe(user => {
          this.user = user;
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured',
            message: 'Could not load User',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['socs/review']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
