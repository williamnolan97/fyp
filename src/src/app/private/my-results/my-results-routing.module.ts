import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyResultsPage } from './my-results.page';

const routes: Routes = [
  {
    path: '',
    component: MyResultsPage
  },
  {
    path: ':socId',
    loadChildren: () => import('./view-soc-result/view-soc-result.module').then( m => m.ViewSocResultPageModule)
  },
  {
    path: ':socId/:resultId',
    loadChildren: () => import('./view-soc-result-detail/view-soc-result-detail.module').then( m => m.ViewSocResultDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyResultsPageRoutingModule {}
