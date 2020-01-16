import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Soc } from '../../soc.model';
import { SocsService } from '../../socs.service';

@Component({
  selector: 'app-soc-detail',
  templateUrl: './soc-detail.page.html',
  styleUrls: ['./soc-detail.page.scss'],
})
export class SocDetailPage implements OnInit {
  soc: Soc;

  constructor(private router: Router, private route: ActivatedRoute, private navCtrl: NavController, private socsService: SocsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('socId')) {
        this.navCtrl.navigateBack('/socs/tabs/search');
        return;
      }
      this.soc = this.socsService.getSoc(paramMap.get('socId'));
    });
  }

  onTakeSoc() {
    // this.router.navigateByUrl('socs/tabs/search');
    this.navCtrl.navigateBack('/socs/tabs/search');
    // this.navCtrl.pop();
  }
}
