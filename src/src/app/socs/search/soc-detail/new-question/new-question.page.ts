import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from 'src/app/services/socs.service';
import { SocQuestionService } from 'src/app/services/soc-question.service';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.page.html',
  styleUrls: ['./new-question.page.scss'],
})
export class NewQuestionPage implements OnInit, OnDestroy {
  soc: Soc;
  public socId: string;
  private socQuestionSub: Subscription;
  isLoading = false;
  questionForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private alertCtrl: AlertController,
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
        this.router.navigate(['/socs/tabs/search', socId]);
      });
    });
  }

}
