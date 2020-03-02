import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartSocPage } from './start-soc.page';

const routes: Routes = [
  {
    path: '',
    component: StartSocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSocPageRoutingModule {}
