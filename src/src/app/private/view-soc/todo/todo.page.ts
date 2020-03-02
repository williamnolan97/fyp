import { Component, OnInit, OnDestroy } from '@angular/core';
import { Soc } from 'src/app/models/soc.model';
import { Subscription } from 'rxjs';
import { SocsService } from 'src/app/services/socs.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, OnDestroy {
  loadedSocs: Soc[];
  listedLoadedPlaces: Soc[];
  private socsSub: Subscription;
  isLoading = false;

  constructor(private socsService: SocsService) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs;
      this.listedLoadedPlaces = this.loadedSocs.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.socsService.fetchSocs().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
  }

}
