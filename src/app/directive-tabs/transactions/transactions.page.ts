import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ClubService } from 'src/app/services/club.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  
  constructor(
    public clubS: ClubService,
    private userS: UserService
  ) { }

  ngOnInit() {
  }

  getTransactionsRefreshed(event: any){
    setTimeout(() => {
      this.clubS.getTransactionsByClub(this.clubS.club?.id || "")
      this.infiniteScroll.disabled = false
      event.target.complete();
    },2000)
  }

  getMoreTransactions(event: any){
    setTimeout(() => {
      this.clubS.getMoreTransactionsByClub(this.clubS.club?.id || "")
      event.target.complete();
      console.log(this.clubS.completeTransaction);
      
      if(this.clubS.completeTransaction){
        event.target.disabled = true
      }
    }, 1500)
  }
}
