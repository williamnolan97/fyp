import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAnswerPageRoutingModule } from './add-answer-routing.module';

import { AddAnswerPage } from './add-answer.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddAnswerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddAnswerPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddAnswerPage]
})
export class AddAnswerPageModule {}
