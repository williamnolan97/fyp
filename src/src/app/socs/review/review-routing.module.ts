import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewPage } from './review.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewPage
  },
  {
    path: ':userId',
    loadChildren: () => import('./review-detail/review-detail.module').then( m => m.ReviewDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewPageRoutingModule {}
