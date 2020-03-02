import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewSocPageRoutingModule } from './add-new-soc-routing.module';

import { AddNewSocPage } from './add-new-soc.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewSocPageRoutingModule
  ],
  declarations: [AddNewSocPage]
})
export class AddNewSocPageModule {}
