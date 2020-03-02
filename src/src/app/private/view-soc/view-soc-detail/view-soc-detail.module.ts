import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSocDetailPageRoutingModule } from './view-soc-detail-routing.module';

import { ViewSocDetailPage } from './view-soc-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSocDetailPageRoutingModule
  ],
  declarations: [ViewSocDetailPage]
})
export class ViewSocDetailPageModule {}
