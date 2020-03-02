import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserResultPageRoutingModule } from './view-user-result-routing.module';

import { ViewUserResultPage } from './view-user-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserResultPageRoutingModule
  ],
  declarations: [ViewUserResultPage]
})
export class ViewUserResultPageModule {}
