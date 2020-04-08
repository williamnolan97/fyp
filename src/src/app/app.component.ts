import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userId: string;
  userRole: number;
  resultsUrl: string;
  progressionUrl: string;
  isLoading = false;
  isLoadingRole = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.isLoading = true;
    this.authService.userId.subscribe(userId => {
      this.userId = userId;
      this.resultsUrl = '/my-results/' + userId;
      this.progressionUrl = '/my-progression/' + userId;
      this.isLoading = false;
    });
    this.isLoadingRole = true;
    this.authService.userRole.subscribe(role => {
      this.userRole = role;
      this.isLoadingRole = false;
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
