import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocsService } from 'src/app/services/socs.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-soc',
  templateUrl: './add-new-soc.page.html',
  styleUrls: ['./add-new-soc.page.scss'],
})
export class AddNewSocPage implements OnInit {
  form: FormGroup;

  constructor(
    private socsService: SocsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
    });
  }

  onCreateSoc() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating SOC...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socsService.addSoc(
        this.form.value.name,
        this.form.value.description,
        []
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/view-soc');
      });
    });
  }
}
