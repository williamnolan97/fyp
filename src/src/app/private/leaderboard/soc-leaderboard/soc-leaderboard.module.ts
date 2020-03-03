import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocLeaderboardPageRoutingModule } from './soc-leaderboard-routing.module';

import { SocLeaderboardPage } from './soc-leaderboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocLeaderboardPageRoutingModule
  ],
  declarations: [SocLeaderboardPage]
})
export class SocLeaderboardPageModule {}
