import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchLeaderboardsPage } from './search-leaderboards.page';

const routes: Routes = [
  {
    path: '',
    component: SearchLeaderboardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchLeaderboardsPageRoutingModule {}
