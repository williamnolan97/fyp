import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = '';
  password = '';
  confirmPassword = '';

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, confirmPassword } = this;
    if (password !== confirmPassword) {
      return console.error('Passwords do not match');
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      console.log(res);
    } catch(error) {
      console.dir(error);
    }
  }

}
