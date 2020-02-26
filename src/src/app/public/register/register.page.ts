import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth2Service } from '../auth2.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public authService: Auth2Service
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.register(email, password);
    form.reset();
  }

}
