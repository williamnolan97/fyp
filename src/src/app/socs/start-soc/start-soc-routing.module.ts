import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartSocPage } from './start-soc.page';

const routes: Routes = [
  {
    path: '',
    component: StartSocPage
  },
  {
    path: 'question/:questionId',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSocPageRoutingModule {}
