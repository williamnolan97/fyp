import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewProgressionPageRoutingModule } from './review-progression-routing.module';

import { ReviewProgressionPage } from './review-progression.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewProgressionPageRoutingModule
  ],
  declarations: [ReviewProgressionPage]
})
export class ReviewProgressionPageModule {}
