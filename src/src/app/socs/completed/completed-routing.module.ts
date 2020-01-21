import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedPage } from './completed.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedPage
  },
  {
    path: 'soc-detail',
    loadChildren: () => import('./soc-detail/soc-detail.module').then( m => m.SocDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedPageRoutingModule {}
