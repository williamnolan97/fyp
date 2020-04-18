/**
 * Name:        Wiliam Nolan
 * Student ID:  C00216986
 * Description: Typescript file for the edit/delete soc page.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { SocsService } from 'src/app/services/socs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { SocAnswerService } from 'src/app/services/soc-answer.service';

@Component({
  selector: 'app-edit-delete-soc',
  templateUrl: './edit-delete-soc.page.html',
  styleUrls: ['./edit-delete-soc.page.scss'],
})
export class EditDeleteSocPage implements OnInit, OnDestroy {
  form: FormGroup;
  errorMsg: string;
  socId: string;
  soc: Soc;
  socSub: Subscription;
  isLoading = false;
  index: number;
  edit = false;

  constructor(
    private fb: FormBuilder,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private socAnswerService: SocAnswerService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/view-soc');
        return;
      }
      this.isLoading = true;
      this.socSub = this.socsService
        .getSoc(paramMap.get('socId'))
        .subscribe(soc => {
          this.soc = soc;
          this.initForm();
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured',
            message: 'Could not load SOC',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['view-soc']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  initForm() {
    this.form = this.fb.group({
      name: new FormControl(this.soc.name, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.soc.description, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      percentage: new FormControl(this.soc.percent, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      questions: this.fb.array([
        this.initQuestion()
      ])
    });
    this.deleteQuestion(0);
    this.initExistingQuestions();
    this.index = 0;
    // tslint:disable-next-line: forin
    for (const key in this.soc.questions) {
      this.initExistingAnswers(this.soc.questions[key].answers, this.index);
      this.index++;
    }
  }

  initExistingQuestions() {
    const control = this.form.controls.questions as FormArray;
    // tslint:disable-next-line: forin
    for (const key in this.soc.questions) {
      control.push(this.fb.group(
        {
          questionName: new FormControl(this.soc.questions[key].name, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(100)]
          }),
          questionId: key,
          answers: this.fb.array([
            this.initAnswer()
          ])
        }
      ));
    }
  }

  initExistingAnswers(answers: any[], index: number) {
    const control = (this.form.controls.questions as FormArray).at(index).get('answers') as FormArray;
    this.deleteAnswer(0, index);
    // tslint:disable-next-line: forin
    for (const key in answers) {
      if (answers[key].isAnswer) {
        control.insert(0, this.fb.group(
          {
            answerName: new FormControl(answers[key].name, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(100)]
            }),
            answerId: key
          }
        ));
      } else {
        control.push(this.fb.group(
          {
            answerName: new FormControl(answers[key].name, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(100)]
            }),
            answerId: key
          }
        ));
      }
    }
  }

  initQuestion() {
    return this.fb.group({
      questionName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      questionId: null,
      answers: this.fb.array([
        this.initAnswer()
      ])
    });
  }

  initAnswer() {
    return this.fb.group({
      answerName: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      answerId: null
    });
  }


  addQuestion() {
    const control = this.form.controls.questions as FormArray;
    control.push(this.initQuestion());
  }


  addAnswer(iQ) {
    const control = (this.form.controls.questions as FormArray).at(iQ).get('answers') as FormArray;
    if (control.length < 4) {
      control.push(this.initAnswer());
    } else {
      this.showAlert('Limit to 4 answers per question');
    }
  }

  async deleteQuestionAlert(iQ) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this question?' ,
      buttons: [
        {
          text: 'Delete Question',
          handler: () => {
            this.deleteQuestion(iQ);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }
      ]
    });

    await alert.present();
  }

  deleteQuestion(i) {
    const control = this.form.controls.questions as FormArray;
    const questionId = control.value[i].questionId;
    if (questionId !== null) {
      this.loadingCtrl.create({
        message: 'Deleting Question...'
      }).then(loadingEl => {
          loadingEl.present();
          this.socQuestionsService.deleteQuestion(
            this.soc.id,
            questionId
          ).subscribe(() => {
            loadingEl.dismiss();
          });
      });
    }
    control.removeAt(i);
  }

  async deleteAnswerAlert(iA, iQ) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this answer?' ,
      buttons: [
        {
          text: 'Delete Answer',
          handler: () => {
            this.deleteAnswer(iA, iQ);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }
      ]
    });

    await alert.present();
  }


  deleteAnswer(i, iQ) {
    const control = (this.form.controls.questions as FormArray).at(iQ).get('answers') as FormArray;
    const questionId = this.form.controls.questions.value[iQ].questionId;
    const answerId = control.value[i].answerId;
    if (questionId !== null && answerId !== null) {
      this.loadingCtrl.create({
        message: 'Deleting Answer...'
      }).then(loadingEl => {
          loadingEl.present();
          this.socAnswerService.deleteAnswer(
            this.soc.id,
            questionId,
            answerId
          ).subscribe(() => {
            loadingEl.dismiss();
          });
      });
    }
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


  async saveChangesAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm changes',
      message: 'Would you like to save changes?',
      buttons: [
        {
          text: 'Save Changes',
          handler: () => {
            this.onEditSoc();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.edit = false;
            this.initForm();
          }
        }
      ]
    });

    await alert.present();
  }

  onEditSoc() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating SOC...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socsService.updateSoc(
        this.soc.id,
        this.form.value.name,
        this.form.value.description,
        this.form.value.percentage,
        this.form.value.questions,
      ).subscribe(() => {
        loadingEl.dismiss();
        this.edit = false;
      });
    });
  }

  async deleteSOCAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to delete this SOC?',
      buttons: [
        {
          text: 'Delete SOC',
          handler: () => {
            this.onDeleteSOC();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

  onDeleteSOC() {
    this.loadingCtrl.create({
      message: 'Deleting SOC...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socsService.deleteSOC(
        this.soc.id,
      ).subscribe(() => {
        this.router.navigateByUrl('/view-soc');
        loadingEl.dismiss();
        this.edit = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }
}
