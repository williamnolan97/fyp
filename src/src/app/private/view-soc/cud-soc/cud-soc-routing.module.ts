import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CudSocPage } from './cud-soc.page';

const routes: Routes = [
  {
    path: '',
    component: CudSocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CudSocPageRoutingModule {}
