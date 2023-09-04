import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { GeneralModalsModule } from "../general-modals/general-modals.module";

@NgModule({
    declarations: [TabsPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        GeneralModalsModule
    ]
})
export class TabsPageModule {}
