import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocsPage } from './socs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SocsPage,
    children: [
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: './search/search.module#SearchPageModule'
          },
          {
            path: ':socId',
            loadChildren: './search/soc-detail/soc-detail.module#SocDetailPageModule'
          },
          {
            path: 'new',
            loadChildren:
              './search/new/new.module#NewPageModule'
          },
        ]
      },
      {
        path: 'todo',
        children: [
          {
            path: '',
            loadChildren: './todo/todo.module#TodoPageModule'
          },
          {
            path: ':socId',
            loadChildren: './todo/soc-detail/soc-detail.module#SocDetailPageModule'
          },
        ]
      },
      {
        path: 'completed',
        children: [
          {
            path: '',
            loadChildren: './completed/completed.module#CompletedPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/todo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/todo',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocsPageRoutingModule {}
