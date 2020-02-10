import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SocsService } from '../socs.service';
import { SocQuestionService } from '../soc-question/soc-question.service';
import { SocAnswerService } from '../soc-question/soc-answer/soc-answer.service';
import { Subscription } from 'rxjs';
import { Soc } from '../soc.model';
import { SocQuestion } from '../soc-question/soc-question.model';
import { QuestionService } from './question/question.service';

@Component({
  selector: 'app-start-soc',
  templateUrl: './start-soc.page.html',
  styleUrls: ['./start-soc.page.scss'],
})
export class StartSocPage implements OnInit, OnDestroy {
  soc: Soc;
  questions: SocQuestion[];
  isLoading = false;
  private socSub: Subscription;
  private socQuestionsSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private socQuestionsService: SocQuestionService,
    private questionsService: QuestionService,
    private socAnswersService: SocAnswerService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.questionsService.reset();
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
    this.socQuestionsSub = this.socQuestionsService.socQuestions.subscribe(socQuestions => {
      this.questions = socQuestions;
    });
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
    if (this.socQuestionsSub) {
      this.socQuestionsSub.unsubscribe();
    }
  }

}
