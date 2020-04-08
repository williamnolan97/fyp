import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeRolePageRoutingModule } from './change-role-routing.module';

import { ChangeRolePage } from './change-role.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangeRolePageRoutingModule
  ],
  declarations: [ChangeRolePage]
})
export class ChangeRolePageModule {}
