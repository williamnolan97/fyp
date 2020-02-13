import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewDetailPage } from './review-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewDetailPage
  },
  {
    path: ':socId',
    loadChildren: () => import('./review-soc-detail/review-soc-detail.module').then( m => m.ReviewSocDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewDetailPageRoutingModule {}
