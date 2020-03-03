import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocLeaderboardPage } from './soc-leaderboard.page';

const routes: Routes = [
  {
    path: '',
    component: SocLeaderboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocLeaderboardPageRoutingModule {}
