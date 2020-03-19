import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormGroupName, Form, Validators, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { SocsService } from 'src/app/services/socs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cud-soc',
  templateUrl: './cud-soc.page.html',
  styleUrls: ['./cud-soc.page.scss'],
})
export class CudSocPage implements OnInit {
  form: FormGroup;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private socsService: SocsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      percentage: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      questions: this.fb.array([
        this.initQuestion()
      ])
    });
    this.deleteQuestion(0);
  }

  initQuestion() {
    return this.fb.group({
      questionName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      answers: this.fb.array([
        this.initAnswer()
      ])
    });
  }

  initAnswer() {
    return this.fb.group({
      answerName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
    });
  }


  addQuestion() {
    const control = this.form.controls.questions as FormArray;
    control.push(this.initQuestion());
  }


  addAnswer(iQ) {
    const control = (this.form.controls.questions as FormArray).at(iQ).get('answers') as FormArray;
    console.log(control);
    if (control.length < 4) {
      control.push(this.initAnswer());
    } else {
      this.showAlert('Limit to 4 answers per question');
    }
  }

  deleteQuestion(i) {
    const control = this.form.controls.questions as FormArray;
    control.removeAt(i);
  }


  deleteAnswer(i, iQ) {
    const control = (this.form.controls.questions as FormArray).at(iQ).get('answers') as FormArray;
    control.removeAt(i);
  }

  private showAlert(message: string) {
    this.alertCtrl.create(
      {
        header: 'Error',
        message,
        buttons: ['Ok']
      }
    )
    .then(alertEl =>
      alertEl.present()
    );
  }

  onCreateSoc() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating SOC...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socsService.createSoc(
        this.form.value.name,
        this.form.value.description,
        this.form.value.percentage,
        this.form.value.questions,
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/view-soc');
      });
    });
  }
}
