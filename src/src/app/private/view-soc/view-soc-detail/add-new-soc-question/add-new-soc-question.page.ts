import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-new-soc-question',
  templateUrl: './add-new-soc-question.page.html',
  styleUrls: ['./add-new-soc-question.page.scss'],
})
export class AddNewSocQuestionPage implements OnInit, OnDestroy {
  soc: Soc;
  public socId: string;
  private socQuestionSub: Subscription;
  isLoading = false;
  questionForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socQuestionsService: SocQuestionService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.socId = this.route.snapshot.paramMap.get('socId');
    this.questionForm = new FormGroup({
      question: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }

  ngOnDestroy() {
    if (this.socQuestionSub) {
      this.socQuestionSub.unsubscribe();
    }
  }

  onCreateSocQuestion(socId: string) {
    if (!this.questionForm.valid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Creating SOC Question...'
    }).then(loadingEl => {
      loadingEl.present();
      this.socQuestionsService.addSocQuestion(
        socId,
        this.questionForm.value.question
      ).subscribe(() => {
        loadingEl.dismiss();
        this.questionForm.reset();
        this.router.navigate(['view-soc', socId]);
      });
    });
  }

}
