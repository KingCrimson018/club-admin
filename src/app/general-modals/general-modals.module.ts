import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualTransactionsComponent } from './individual-transactions/individual-transactions.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';



@NgModule({
  declarations: [IndividualTransactionsComponent, MakeTransactionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [IndividualTransactionsComponent, MakeTransactionComponent]
})
export class GeneralModalsModule { }
