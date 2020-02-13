import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewSocDetailPageRoutingModule } from './review-soc-detail-routing.module';

import { ReviewSocDetailPage } from './review-soc-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewSocDetailPageRoutingModule
  ],
  declarations: [ReviewSocDetailPage]
})
export class ReviewSocDetailPageModule {}
