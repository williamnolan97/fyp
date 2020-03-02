import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewSocQuestionPage } from './add-new-soc-question.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewSocQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewSocQuestionPageRoutingModule {}
