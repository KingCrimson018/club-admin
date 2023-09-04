import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Transaction, User } from 'src/app/models.ts/models';
import { ClubService } from 'src/app/services/club.service';
import { GeneralServicesService } from 'src/app/services/general-services.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-make-deposit-modal',
  templateUrl: './make-deposit-modal.component.html',
  styleUrls: ['./make-deposit-modal.component.scss'],
})
export class MakeDepositModalComponent  implements OnInit {
  transactionForm!: FormGroup
  users: User[] = []
  constructor(
    private tr: TransactionService,
    private fb: FormBuilder,
    private clubS: ClubService,
    private gs: GeneralServicesService,
    private modalController: ModalController

  ) { 
    this.transactionForm = this.fb.group({
      "destiny": ["", Validators.required],
      "amount": ["", Validators.required],
      "description": [""]
    })
  }

  ngOnInit() {
    this.gs.getUsersPerClub(this.clubS.club?.id || "").forEach(res => {
      for(let user of res.docs){
        if(user.data().role == "member"){
          this.users.push(user.data())
        }
      }
    })
  }

  makeDeposit(){
    let receiverInfo = this.users.filter(x => x.id == this.transactionForm.value.destiny)[0]

    let transaction: Transaction = {
      id: '',
      idClub: this.clubS.club?.id || "",
      type: 'deposit',
      idSender: this.clubS.club?.id || "",

      sender:{
        firstName: this.clubS.club?.name || "",
        lastName: this.clubS.club?.zone || "",
        profilePhoto: "",
        totalAfter: 0
      },

      idReceiver: this.transactionForm.value.destiny,

      receiver:{
        firstName: receiverInfo.firstName,
        lastName: receiverInfo.lastName,
        profilePhoto: "",
        totalAfter: 0
      },

      date: new Date(),
      amount: this.transactionForm.value.amount,
      reason: this.transactionForm.value.description
    }

    this.tr.makeTransaction(transaction).then(() => {
      this.close()
    })
  }

  close(){
    this.modalController.dismiss()
  }

}
