import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewSocPageRoutingModule } from './review-soc-routing.module';

import { ReviewSocPage } from './review-soc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewSocPageRoutingModule
  ],
  declarations: [ReviewSocPage]
})
export class ReviewSocPageModule {}
