import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQuestionPage } from './new-question.page';

const routes: Routes = [
  {
    path: '',
    component: NewQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuestionPageRoutingModule {}
