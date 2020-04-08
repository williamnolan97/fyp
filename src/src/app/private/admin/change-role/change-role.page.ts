import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.page.html',
  styleUrls: ['./change-role.page.scss'],
})
export class ChangeRolePage implements OnInit {
  form: FormGroup;
  selectedUser: UserData;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.authService.getUser(paramMap.get('userId'))
        .subscribe(user => {
          this.selectedUser = user;
        });
    });
    this.form = this.fb.group({
      role: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating role...'
    }).then(loadingEl => {
      loadingEl.present();
      this.route.paramMap.subscribe(paramMap => {
        this.authService.updateRole(
          this.form.value.role,
          this.selectedUser
        ).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/admin');
        });
      });
    });
  }

}
