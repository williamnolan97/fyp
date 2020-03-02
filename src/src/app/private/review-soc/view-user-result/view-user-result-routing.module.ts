import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserResultPage } from './view-user-result.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUserResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserResultPageRoutingModule {}
