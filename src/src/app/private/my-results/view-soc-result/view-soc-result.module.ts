import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSocResultPageRoutingModule } from './view-soc-result-routing.module';

import { ViewSocResultPage } from './view-soc-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSocResultPageRoutingModule
  ],
  declarations: [ViewSocResultPage]
})
export class ViewSocResultPageModule {}
