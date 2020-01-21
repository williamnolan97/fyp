import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocsService } from '../../socs.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SocQuestion } from '../../soc-question/soc-question.model';
import { SocAnswer } from '../../soc-question/soc-answer/soc-answer.model';
import { SocQuestionService } from '../../soc-question/soc-question.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  form: FormGroup;

  constructor(
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
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
      question: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      answer1: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      answer2: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      answer3: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      answer4: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
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
        this.router.navigateByUrl('/socs/tabs/search');
      });
    });
  }
}
