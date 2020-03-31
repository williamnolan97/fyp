import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewUserProgressionPage } from './review-user-progression.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewUserProgressionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewUserProgressionPageRoutingModule {}
