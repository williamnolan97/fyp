import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewSocAnswerPageRoutingModule } from './add-new-soc-answer-routing.module';

import { AddNewSocAnswerPage } from './add-new-soc-answer.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewSocAnswerPageRoutingModule
  ],
  declarations: [AddNewSocAnswerPage]
})
export class AddNewSocAnswerPageModule {}
