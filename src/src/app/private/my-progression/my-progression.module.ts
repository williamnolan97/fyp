import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProgressionPageRoutingModule } from './my-progression-routing.module';

import { MyProgressionPage } from './my-progression.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProgressionPageRoutingModule
  ],
  declarations: [MyProgressionPage]
})
export class MyProgressionPageModule {}
