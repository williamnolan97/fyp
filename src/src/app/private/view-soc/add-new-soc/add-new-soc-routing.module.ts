import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewSocPage } from './add-new-soc.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewSocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewSocPageRoutingModule {}
