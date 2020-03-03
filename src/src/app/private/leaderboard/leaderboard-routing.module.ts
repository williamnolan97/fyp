import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardPage } from './leaderboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search-leaderboards',
    pathMatch: 'full'
  },
  {
    path: 'search-leaderboards',
    loadChildren: () => import('./search-leaderboards/search-leaderboards.module').then( m => m.SearchLeaderboardsPageModule)
  },
  {
    path: ':socId',
    loadChildren: () => import('./soc-leaderboard/soc-leaderboard.module').then( m => m.SocLeaderboardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderboardPageRoutingModule {}
