import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSocPageRoutingModule } from './view-soc-routing.module';

import { ViewSocPage } from './view-soc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSocPageRoutingModule
  ],
  declarations: [ViewSocPage]
})
export class ViewSocPageModule {}
