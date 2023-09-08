import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Transaction, User } from 'src/app/models.ts/models';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  transactions: Transaction[] = []
  completed: boolean = false
  lastTransaction: any
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  constructor(
   public userS: UserService,
    public ts: TransactionService

  ) {

   }

  ngOnInit() {
    setTimeout(() => {
      if(this.ts.completeReceiver && this.ts.completeSender){
        this.infiniteScroll.disabled = true
      }
    },100)
  }

  getTransactionsRefreshed(event: any){
    setTimeout(() => {
      this.userS.getUserLogged()
      this.infiniteScroll.disabled = false
      event.target.complete();
    },2000)
  }

  getMoreTransactions(event: any){
    setTimeout(() => {
      this.ts.getMoreTransactionsPerUser(this.userS.logged?.id || "")
      event.target.complete();
      console.log(this.ts.completeReceiver, " || ", this.ts.completeSender);
      
      if(this.ts.completeReceiver && this.ts.completeSender){
        event.target.disabled = true
      }
    }, 1500)
  }
}
