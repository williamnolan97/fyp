import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchLeaderboardsPageRoutingModule } from './search-leaderboards-routing.module';

import { SearchLeaderboardsPage } from './search-leaderboards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchLeaderboardsPageRoutingModule
  ],
  declarations: [SearchLeaderboardsPage]
})
export class SearchLeaderboardsPageModule {}
