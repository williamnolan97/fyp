import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocResultPageRoutingModule } from './soc-result-routing.module';

import { SocResultPage } from './soc-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocResultPageRoutingModule
  ],
  declarations: [SocResultPage]
})
export class SocResultPageModule {}
