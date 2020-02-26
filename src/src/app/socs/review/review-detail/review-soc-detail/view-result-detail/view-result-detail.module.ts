import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewResultDetailPageRoutingModule } from './view-result-detail-routing.module';

import { ViewResultDetailPage } from './view-result-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewResultDetailPageRoutingModule
  ],
  declarations: [ViewResultDetailPage]
})
export class ViewResultDetailPageModule {}
