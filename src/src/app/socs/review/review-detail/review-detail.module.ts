import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewDetailPageRoutingModule } from './review-detail-routing.module';

import { ReviewDetailPage } from './review-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewDetailPageRoutingModule
  ],
  declarations: [ReviewDetailPage]
})
export class ReviewDetailPageModule {}
