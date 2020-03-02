import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewSocQuestionPageRoutingModule } from './add-new-soc-question-routing.module';

import { AddNewSocQuestionPage } from './add-new-soc-question.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddNewSocQuestionPageRoutingModule
  ],
  declarations: [AddNewSocQuestionPage]
})
export class AddNewSocQuestionPageModule {}
