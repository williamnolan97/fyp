import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = '';
  password = '';
  confirmPassword = '';

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, confirmPassword } = this;
    if (password !== confirmPassword) {
      this.showAlert('Error!', 'Passwords don\'t match');
      return console.error('Passwords do not match');
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      console.log(res);
      this.showAlert('Success!', 'Welcome aboard!');
      this.router.navigate(['/home']);
    } catch(error) {
      console.dir(error);
      this.showAlert('Error!', error.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
