import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewUserProgressionPageRoutingModule } from './review-user-progression-routing.module';

import { ReviewUserProgressionPage } from './review-user-progression.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewUserProgressionPageRoutingModule
  ],
  declarations: [ReviewUserProgressionPage]
})
export class ReviewUserProgressionPageModule {}
