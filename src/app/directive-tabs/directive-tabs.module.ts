import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectiveTabsPageRoutingModule } from './directive-tabs-routing.module';

import { DirectiveTabsPage } from './directive-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectiveTabsPageRoutingModule
  ],
  declarations: [DirectiveTabsPage]
})
export class DirectiveTabsPageModule {}
