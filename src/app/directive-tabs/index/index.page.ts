import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Transaction } from 'src/app/models.ts/models';
import { ClubService } from 'src/app/services/club.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  constructor(
    private userS: UserService,
    public clubS: ClubService,
    public ts: TransactionService
  ) { 

  }

  ngOnInit() {
  }

  getLogged(){
    this.userS.getUserLogged()
  }
  getTransactionsRefreshed(event: any){
    setTimeout(() => {
      this.userS.getUserLogged()
      this.ts.completeReceiver = false
      this.ts.completeSender = false
      this.infiniteScroll.disabled = false
      event.target.complete();
    },2000)
  }

  getMoreTransactions(event: any){
    setTimeout(() => {
      this.ts.getMoreTransactionsPerUser(this.clubS.club?.id || "")
      event.target.complete();
      console.log(this.ts.completeReceiver, " || ", this.ts.completeSender);
      
      if(this.ts.completeReceiver && this.ts.completeSender){
        event.target.disabled = true
      }
    }, 1500)
  }




}
