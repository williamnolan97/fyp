import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  authenticateLogin(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.login(email, password);
        authObs.subscribe(resData => {
          this.authService.updateCurrUser(resData.localId).subscribe();
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('view-soc');
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not log you in, please try again';
          if (code === 'EMAIL_NOT_FOUND') {
            message = 'Email address could not be found';
          } else if (code === 'INVALID_PASSWORD') {
            message = 'This password is incorrect';
          }
          this.showAlert(message);
        });
      });
  }
  authenticateSignUp(email: string, password: string, fname: string, lname: string, role: number) {
    this.isLoading = true;
    let generatedId: string;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Signing up...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.signUp(email, password);
        authObs.subscribe(resData => {
          this.authService.createUser(resData.localId, email, fname, lname, role).subscribe();
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('view-soc');
          generatedId = resData.localId;
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = 'Could not sign you up, please try again';
          if (code === 'EMAIL_EXISTS') {
            message = 'This email address already exists!';
          }
          this.showAlert(message);
        });
      });
    this.isLogin = true;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogin) {
      this.authenticateLogin(email, password);
    } else {
      const fname = form.value.fname;
      const lname = form.value.lname;
      const role = form.value.role;
      console.log(role);
      this.authenticateSignUp(email, password, fname, lname, role);
    }
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl.create(
      {
        header: 'Authentication failed',
        message,
        buttons: ['Ok']
      }
    )
    .then(alertEl =>
      alertEl.present()
    );
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
