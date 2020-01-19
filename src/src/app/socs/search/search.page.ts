import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from '../socs.service';
import { Soc } from '../soc.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  loadedSocs: Soc[];
  listedLoadedPlaces: Soc[];
  private socsSub: Subscription;

  constructor(private socsService: SocsService) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listedLoadedPlaces = this.loadedSocs.slice(1);
    });
  }

  ngOnDestroy() {
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
  }
}
