import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocDetailPageRoutingModule } from './soc-detail-routing.module';

import { SocDetailPage } from './soc-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocDetailPageRoutingModule
  ],
  declarations: [SocDetailPage]
})
export class SocDetailPageModule {}
