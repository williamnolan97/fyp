import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocsService } from '../socs.service';
import { Soc } from '../soc.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, OnDestroy {
  loadedSocs: Soc[];
  listedLoadedPlaces: Soc[];
  private socsSub: Subscription;

  constructor(private socsService: SocsService) { }

  ngOnInit() {
    this.socsSub = this.socsService.socs.subscribe(socs => {
      this.loadedSocs = socs.filter(item => item.state === 'Todo');
      this.listedLoadedPlaces = this.loadedSocs.slice(1);
    });
  }

  ngOnDestroy() {
    if (this.socsSub) {
      this.socsSub.unsubscribe();
    }
  }

}
