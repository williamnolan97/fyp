import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocDetailPage } from './soc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SocDetailPage
  },
  {
    path: 'new-question',
    loadChildren: () => import('./new-question/new-question.module').then( m => m.NewQuestionPageModule)
  },
  {
    path: ':questionId/add-answer',
    loadChildren: () => import('./add-answer/add-answer.module').then( m => m.AddAnswerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocDetailPageRoutingModule {}
