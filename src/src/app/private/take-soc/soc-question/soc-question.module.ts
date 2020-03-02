import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocQuestionPageRoutingModule } from './soc-question-routing.module';

import { SocQuestionPage } from './soc-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocQuestionPageRoutingModule
  ],
  declarations: [SocQuestionPage]
})
export class SocQuestionPageModule {}
