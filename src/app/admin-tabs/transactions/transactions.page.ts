import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Club, Transaction } from 'src/app/models.ts/models';
import { AdminService } from 'src/app/services/admin.service';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  zone: string = ""
  clubId: string = "" 
  clubs: Club[] = []

  constructor(
    public clubS: ClubService,
    public adminS: AdminService
  ) { }

  ngOnInit() {
  }

  filter(){
    this.clubS.transactions = []
    this.clubS.completeTransaction = false
    this.infiniteScroll.disabled = false
    this.clubS.getTransactionsByClub(this.clubId)
  }

  getClubs(){
    this.clubs = []
    this.clubId = ""
    this.adminS.getClubsByZone(this.zone).forEach(res => {
      for(let club of res.docs){
        this.clubs.push(club.data())
      }
    })
  }
  
  getMoreTransactions(event: any){
    setTimeout(() => {
      this.clubS.getMoreTransactionsByClub(this.clubId)
      event.target.complete();
      console.log(this.clubS.completeTransaction);
      
      if(this.clubS.completeTransaction){
        event.target.disabled = true
      }
    }, 1000)
  }
}
