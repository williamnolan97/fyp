import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { SocsService } from 'src/app/services/socs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';

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
          console.log((this.form.controls.questions as FormArray).at(0).get('answers') as FormArray);
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
          }
        ));
      } else {
        control.push(this.fb.group(
          {
            answerName: new FormControl(answers[key].name, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(100)]
            }),
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

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }
}
