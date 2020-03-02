import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeSocPageRoutingModule } from './take-soc-routing.module';

import { TakeSocPage } from './take-soc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeSocPageRoutingModule
  ],
  declarations: [TakeSocPage]
})
export class TakeSocPageModule {}
