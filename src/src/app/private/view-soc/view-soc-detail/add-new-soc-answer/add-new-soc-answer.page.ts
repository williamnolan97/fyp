import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SocAnswerService } from 'src/app/services/soc-answer.service';

@Component({
  selector: 'app-add-new-soc-answer',
  templateUrl: './add-new-soc-answer.page.html',
  styleUrls: ['./add-new-soc-answer.page.scss'],
})
export class AddNewSocAnswerPage implements OnInit {
  public socId: string;
  public questionId: string;
  answerForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socAnswersService: SocAnswerService,
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
      correct: new FormControl(false, {
      }),
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
        this.answerForm.value.correct
      ).subscribe(() => {
        loadingEl.dismiss();
        this.answerForm.reset();
        this.router.navigate(['view-soc', socId]);
      });
    });
  }

}