import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocQuestionPage } from './soc-question.page';

const routes: Routes = [
  {
    path: '',
    component: SocQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocQuestionPageRoutingModule {}
