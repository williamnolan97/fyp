import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewSocDetailPage } from './review-soc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewSocDetailPage
  },
  {
    path: ':resultId',
    loadChildren: () => import('./view-result-detail/view-result-detail.module').then( m => m.ViewResultDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewSocDetailPageRoutingModule {}
