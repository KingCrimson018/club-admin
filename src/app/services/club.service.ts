import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { Club, Transaction, User } from '../models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  club!: Club | undefined
  topBalances: User[] = []
  members: User[] = []

  transactions: Transaction[] = []
  lastTransaction: any
  completeTransaction: boolean = false

  constructor(
    private fs: AngularFirestore,
  ) {

   }

   getClubInfo(id: string){
    return this.fs.collection<Club>("clubs").doc(id).get().forEach(res => {
      this.club = res.data()
    })
   }

   getTopUsersByBalance(idClub: string){
    this.topBalances = []
    return this.fs.collection<User>("users", ref => ref.where("idClub", "==", idClub).orderBy("total", "desc").limit(3)).get().forEach((res) => {
      for( let user of res.docs){
        this.topBalances.push(user.data())
      }
    })
   }
   getMembers(clubId: string){
    this.members = []
    return this.fs.collection<User>("users", ref => ref.where("idClub", "==", clubId)).get()
   }
   getTransactionsByClub(clubId: string){
    this.transactions = []
    this.completeTransaction = false
    this.fs.collection<Transaction>("transactions", ref => ref.where("idClub", "==", clubId).orderBy("date", "desc").limit(5)).get().forEach(res => {
      this.lastTransaction = res.docs[res.docs.length - 1]
      for(let trans of res.docs){
        this.transactions.push(trans.data())
      }
    })
   }
   getMoreTransactionsByClub(clubId: string){
    if(this.completeTransaction == false){
      this.fs.collection<Transaction>("transactions", ref => ref.where("idClub", "==", clubId).orderBy("date", "desc").startAfter(this.lastTransaction).limit(5)).get().forEach(res => {
        this.lastTransaction = res.docs[res.docs.length - 1]
        for(let trans of res.docs){
          this.transactions.push(trans.data())
        }
        if(res.docs.length < 5){
          this.completeTransaction = true
        }
      })
    }
   }

   disableMember(memberId: string){
    return this.fs.collection<User>("users").doc(memberId).update({disable: true})
   }
   enableMember(memberId: string){
    return this.fs.collection<User>("users").doc(memberId).update({disable: false})
   }
}
