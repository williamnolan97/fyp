import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSocDetailPage } from './view-soc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSocDetailPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSocDetailPageRoutingModule {}
