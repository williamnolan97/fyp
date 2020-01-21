import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Soc } from '../../soc.model';
import { SocsService } from '../../socs.service';
import { Subscription } from 'rxjs';
import { SocQuestionService } from '../../soc-question/soc-question.service';
import { SocQuestion } from '../../soc-question/soc-question.model';
import { SocAnswerService } from '../../soc-question/soc-answer/soc-answer.service';
import { SocAnswer } from '../../soc-question/soc-answer/soc-answer.model';

@Component({
  selector: 'app-soc-detail',
  templateUrl: './soc-detail.page.html',
  styleUrls: ['./soc-detail.page.scss'],
})
export class SocDetailPage implements OnInit, OnDestroy {
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
    private socAnswersService: SocAnswerService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
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
                  this.router.navigate(['socs/tabs/search']);
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
    // this.questionId = this.loadedSocQuestions[0].id;
    // this.socAnswerSub = this.socAnswersService.socAnswers.subscribe(socAnswers => {
    //   this.loadedSocAnswers = socAnswers.filter(item =>
    //     item.questionId === this.questionId
    //   );
    // });
  }

  ionViewWillEnter() {
    this.socId = this.route.snapshot.paramMap.get('socId');
    this.isLoading = true;
    this.socQuestionsService.fetchQuestions(this.socId).subscribe(() => {
      this.isLoading = false;
    });
    // this.questionId = this.loadedSocQuestions[0].id;
    // this.isAnswersLoading = true;
    // this.socAnswersService.fetchAnswers(this.socId, this.questionId).subscribe(() => {
    //   this.isAnswersLoading = false;
    // });
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

  onTakeSoc() {
    // this.router.navigateByUrl('socs/tabs/search');
    this.navCtrl.navigateBack('/socs/tabs/search');
    // this.navCtrl.pop();
  }
}
