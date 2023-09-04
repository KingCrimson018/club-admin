import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDirectorPageRoutingModule } from './add-director-routing.module';

import { AddDirectorPage } from './add-director.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddDirectorPageRoutingModule
  ],
  declarations: [AddDirectorPage]
})
export class AddDirectorPageModule {}
