import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from '../soc.model';
import { Subscription } from 'rxjs';
import { SocsService } from '../socs.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})

export class CompletedPage implements OnInit, OnDestroy {
  loadedSocs: Soc[];
  listedLoadedPlaces: Soc[];
  private socsSub: Subscription;

  constructor(private socsService: SocsService) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs.filter(item => item.state === 'Completed');
      this.listedLoadedPlaces = this.loadedSocs.slice(1);
    });
  }

  ngOnDestroy() {
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
  }

}
