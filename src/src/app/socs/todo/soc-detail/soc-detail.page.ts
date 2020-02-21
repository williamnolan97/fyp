import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Soc } from '../../../models/soc.model';
import { SocsService } from 'src/app/services/socs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-soc-detail',
  templateUrl: './soc-detail.page.html',
  styleUrls: ['./soc-detail.page.scss'],
})
export class SocDetailPage implements OnInit, OnDestroy {
  soc: Soc;
  private socSub: Subscription;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private socsService: SocsService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/todo');
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
                  this.router.navigate(['socs/tabs/todo']);
                }
              }
            ]
          }).then(alertEl => alertEl.present());
        });
    });
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }
}
