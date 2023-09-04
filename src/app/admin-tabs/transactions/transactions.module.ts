import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { DirectiveComponentsModule } from "../../directive-components/directive-components.module";

@NgModule({
    declarations: [TransactionsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TransactionsPageRoutingModule,
        DirectiveComponentsModule
    ]
})
export class TransactionsPageModule {}
