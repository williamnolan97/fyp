import { Component, OnInit } from '@angular/core';
import { SocsService } from '../socs.service';
import { Soc } from '../soc.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  loadedSocs: Soc[];

  constructor(private socsService: SocsService) { }

  ngOnInit() {
    this.loadedSocs = this.socsService.socs;
  }

}
