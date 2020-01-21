import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewQuestionPageRoutingModule } from './new-question-routing.module';

import { NewQuestionPage } from './new-question.page';

const routes: Routes = [
  {
    path: '',
    component: NewQuestionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewQuestionPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewQuestionPage]
})
export class NewQuestionPageModule {}
