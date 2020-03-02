import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeSocPage } from './take-soc.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/view-soc/tabs/todo',
    pathMatch: 'full'
  },
  {
    path: 'start-soc/:socId',
    loadChildren: () => import('./start-soc/start-soc.module').then( m => m.StartSocPageModule)
  },
  {
    path: 'soc-result/:socId',
    loadChildren: () => import('./soc-result/soc-result.module').then( m => m.SocResultPageModule)
  },
  {
    path: ':socId/:questionId',
    loadChildren: () => import('./soc-question/soc-question.module').then( m => m.SocQuestionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeSocPageRoutingModule {}
