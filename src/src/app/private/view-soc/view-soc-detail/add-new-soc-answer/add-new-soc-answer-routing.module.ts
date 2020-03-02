import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewSocAnswerPage } from './add-new-soc-answer.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewSocAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewSocAnswerPageRoutingModule {}
