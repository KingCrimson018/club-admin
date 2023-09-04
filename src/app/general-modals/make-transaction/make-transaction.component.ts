import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Receiver, Sender, Transaction, User } from 'src/app/models.ts/models';
import { GeneralServicesService } from 'src/app/services/general-services.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss'],
})
export class MakeTransactionComponent  implements OnInit {
  transactionForm!: FormGroup
  users: User[] = []
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private gs: GeneralServicesService,
    public userS: UserService,
    private ts: TransactionService
  ) { 
    this.transactionForm = this.fb.group({
      "destiny": ["", Validators.required],
      "amount": [0, Validators.required],
      "description": ["",]
    })
    

  }

  ngOnInit() {
    this.gs.getUsersPerClub(this.userS.logged?.idClub || "").forEach(res => {
      for(let user of res.docs){
        if(user.data().id != this.userS.logged?.id && user.data().role == "member" ){
          this.users.push(user.data())
        }
      }
    })
    
  }

  makeTransaction(){

    if(this.transactionForm.value.destiny == this.userS.logged?.idClub){
      
      let receiver: Receiver = {
        firstName: this.userS.logged?.clubName || "",
        lastName: "Zona 4",
        profilePhoto: '',
        totalAfter: 0
      }
  
      
      let newTransaction: Transaction = {
        id: '',
        idClub: this.userS.logged?.idClub || "",
        type: "payment",

        idSender: this.userS.logged?.id || "",
        sender: {
          firstName:  this.userS.logged?.firstName || "",
          lastName:  this.userS.logged?.lastName|| "",
          profilePhoto: '',
          totalAfter:  this.userS.logged?.total || 0 - this.transactionForm.value.amount
        },

        idReceiver: this.transactionForm.value.destiny,
        receiver: receiver,
        date: new Date(),
        amount: this.transactionForm.value.amount,
        reason: this.transactionForm.value.description,
      }

      this.ts.makeTransaction(newTransaction).then(() => {
        this.modalCtrl.dismiss()
      })
    }else{
      let receiverInfo = this.users.filter(x => x.id == this.transactionForm.value.destiny)[0]
      let receiver: Receiver = {
        firstName: receiverInfo.firstName,
        lastName: receiverInfo.lastName,
        profilePhoto: '',
        totalAfter: receiverInfo.total + this.transactionForm.value.amount
      }
  

      let newTransaction: Transaction = {
        id: '',
        idClub: this.userS.logged?.idClub || "",
        type: "transfer",

        idSender: this.userS.logged?.id || "",
        sender: {
          firstName:  this.userS.logged?.firstName || "",
          lastName:  this.userS.logged?.lastName|| "",
          profilePhoto: '',
          totalAfter:  this.userS.logged?.total || 0 - this.transactionForm.value.amount
        },

        idReceiver: this.transactionForm.value.destiny,
        receiver: receiver,
        date: new Date(),
        amount: this.transactionForm.value.amount,
        reason: this.transactionForm.value.description,
      }

      this.ts.makeTransaction(newTransaction).then(() => {
        this.modalCtrl.dismiss()
      })
    }
  }

  close(){
    this.modalCtrl.dismiss()
  }

}
