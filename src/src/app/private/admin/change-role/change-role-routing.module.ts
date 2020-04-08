import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeRolePage } from './change-role.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeRolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeRolePageRoutingModule {}
