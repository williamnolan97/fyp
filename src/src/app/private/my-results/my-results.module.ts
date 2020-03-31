import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyResultsPageRoutingModule } from './my-results-routing.module';

import { MyResultsPage } from './my-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyResultsPageRoutingModule
  ],
  declarations: [MyResultsPage]
})
export class MyResultsPageModule {}
