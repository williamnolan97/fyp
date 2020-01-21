import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Soc } from '../../soc.model';
import { SocsService } from '../../socs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-soc-detail',
  templateUrl: './soc-detail.page.html',
  styleUrls: ['./soc-detail.page.scss'],
})
export class SocDetailPage implements OnInit, OnDestroy {
  soc: Soc;
  private socSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private navCtrl: NavController, private socsService: SocsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
        return;
      }
      this.socSub = this.socsService.getSoc(paramMap.get('socId')).subscribe(soc => {
        this.soc = soc;
      });
    });
  }

  ngOnDestroy() {
    if (this.socSub) {
      this.socSub.unsubscribe();
    }
  }
}
