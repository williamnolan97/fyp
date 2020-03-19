import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeleteSocPageRoutingModule } from './edit-delete-soc-routing.module';

import { EditDeleteSocPage } from './edit-delete-soc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditDeleteSocPageRoutingModule
  ],
  declarations: [EditDeleteSocPage]
})
export class EditDeleteSocPageModule {}
