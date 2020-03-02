import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartSocPageRoutingModule } from './start-soc-routing.module';

import { StartSocPage } from './start-soc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartSocPageRoutingModule
  ],
  declarations: [StartSocPage]
})
export class StartSocPageModule {}
