import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewSocPage } from './review-soc.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: ':userId',
    loadChildren: () => import('./view-user-result/view-user-result.module').then( m => m.ViewUserResultPageModule)
  },
  {
    path: ':userId/:socId',
    loadChildren: () => import('./view-soc-result/view-soc-result.module').then( m => m.ViewSocResultPageModule)
  },
  {
    path: ':userId/:socId/:resultId',
    loadChildren: () => import('./view-soc-result-detail/view-soc-result-detail.module').then( m => m.ViewSocResultDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewSocPageRoutingModule {}
