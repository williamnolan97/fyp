import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSocResultDetailPageRoutingModule } from './view-soc-result-detail-routing.module';

import { ViewSocResultDetailPage } from './view-soc-result-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSocResultDetailPageRoutingModule
  ],
  declarations: [ViewSocResultDetailPage]
})
export class ViewSocResultDetailPageModule {}
