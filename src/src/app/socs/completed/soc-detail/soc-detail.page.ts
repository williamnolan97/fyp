import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from '../../soc.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SocsService } from '../../socs.service';

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
        this.navCtrl.navigateBack('/socs/tabs/completed');
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
                  this.router.navigate(['socs/tabs/completed']);
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
