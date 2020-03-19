import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSocPage } from './view-soc.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/todo',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: ViewSocPage,
    children: [
      {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then( m => m.TodoPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'cud-soc',
    loadChildren: () => import('./cud-soc/cud-soc.module').then( m => m.CudSocPageModule)
  },
  {
    path: ':socId',
    loadChildren: () => import('./view-soc-detail/view-soc-detail.module').then( m => m.ViewSocDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSocPageRoutingModule {}
