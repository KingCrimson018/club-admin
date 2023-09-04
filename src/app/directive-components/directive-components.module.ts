import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullTransactionComponent } from './full-transaction/full-transaction.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { MakeDepositModalComponent } from './make-deposit-modal/make-deposit-modal.component';



@NgModule({
  declarations: [FullTransactionComponent, AddUserModalComponent, MakeDepositModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FullTransactionComponent, AddUserModalComponent, MakeDepositModalComponent]
})
export class DirectiveComponentsModule { }
