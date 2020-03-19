import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CudSocPageRoutingModule } from './cud-soc-routing.module';

import { CudSocPage } from './cud-soc.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CudSocPageRoutingModule,
  ],
  declarations: [CudSocPage]
})
export class CudSocPageModule {}
