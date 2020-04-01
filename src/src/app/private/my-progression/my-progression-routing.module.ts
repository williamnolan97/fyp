import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProgressionPage } from './my-progression.page';

const routes: Routes = [
  {
    path: '',
    component: MyProgressionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProgressionPageRoutingModule {}
