import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { SocQuestion } from 'src/app/models/soc-question.model';
import { SocAnswer } from 'src/app/models/soc-answer.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SocsService } from 'src/app/services/socs.service';
import { SocQuestionService } from 'src/app/services/soc-question.service';

@Component({
  selector: 'app-view-soc-detail',
  templateUrl: './view-soc-detail.page.html',
  styleUrls: ['./view-soc-detail.page.scss'],
})
export class ViewSocDetailPage implements OnInit, OnDestroy {
  soc: Soc;
  loadedSocQuestions: SocQuestion[];
  loadedSocAnswers: SocAnswer[];
  private socSub: Subscription;
  private socQuestionSub: Subscription;
  private socAnswerSub: Subscription;
  public socId: string;
  public questionId: string;
  isLoading = false;
  isAnswersLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private alertCtrl: AlertController
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
    this.socQuestionSub = this.socQuestionsService.socQuestions.subscribe(socQuestions => {
      this.loadedSocQuestions = socQuestions.filter(item =>
        item.socId === this.socId
      );
    });
  }

  ionViewWillEnter() {
    this.socId = this.route.snapshot.paramMap.get('socId');
    this.isLoading = true;
    this.socQuestionsService.fetchQuestions(this.socId).subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
    if (this.socQuestionSub) {
      this.socQuestionSub.unsubscribe();
    }
    if (this.socAnswerSub) {
      this.socAnswerSub.unsubscribe();
    }
  }
}
