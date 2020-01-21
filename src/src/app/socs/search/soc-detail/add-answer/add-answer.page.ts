import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { SocsService } from 'src/app/socs/socs.service';
import { SocQuestionService } from 'src/app/socs/soc-question/soc-question.service';
import { SocAnswerService } from 'src/app/socs/soc-question/soc-answer/soc-answer.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.page.html',
  styleUrls: ['./add-answer.page.scss'],
})
export class AddAnswerPage implements OnInit {
  public socId: string;
  public questionId: string;
  answerForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socAnswersService: SocAnswerService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.socId = this.route.snapshot.paramMap.get('socId');
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.answerForm = new FormGroup({
      answer1: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // answer2: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // }),
      // answer3: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // }),
      // answer4: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // }),
    });
  }

  onCreateSocAnswer(socId: string, questionId: string) {
    if (!this.answerForm.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating SOC Answer...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socAnswersService.addSocAnswer(
        socId,
        questionId,
        this.answerForm.value.answer1,
        true
      ).subscribe(() => {
        loadingEl.dismiss();
        this.answerForm.reset();
        this.router.navigate(['/socs/tabs/search', socId]);
      });
    });
  }

}
