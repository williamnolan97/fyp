import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocsPageRoutingModule } from './socs-routing.module';

import { SocsPage } from './socs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocsPageRoutingModule
  ],
  declarations: [SocsPage]
})
export class SocsPageModule {}
