import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Auth2Service } from '../auth2.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    public authService: Auth2Service,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      member: new FormControl(false, {
        updateOn: 'blur',
      }),
      trainer: new FormControl(false, {
        updateOn: 'blur',
      }),
      manager: new FormControl(false, {
        updateOn: 'blur',
      }),
    });
  }

  registerUser() {
    // if (!this.form.valid) {
    //   return;
    // }
    console.log(this.form);
    console.log(this.form.value.fname);
    console.log(this.form.value.password);
    console.log(this.form.value.member);
    console.log(this.form.value.trainer);
    console.log(this.form.value.manager);
    this.form.reset();
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
