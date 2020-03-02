import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSocDetailPage } from './view-soc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSocDetailPage
  },
  {
    path: ':questionId/add-new-soc-answer',
    loadChildren: () => import('./add-new-soc-answer/add-new-soc-answer.module').then( m => m.AddNewSocAnswerPageModule)
  },
  {
    path: 'add-new-soc-question',
    loadChildren: () => import('./add-new-soc-question/add-new-soc-question.module').then( m => m.AddNewSocQuestionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSocDetailPageRoutingModule {}
