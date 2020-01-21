import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocDetailPage } from './soc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SocDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocDetailPageRoutingModule {}
