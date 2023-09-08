import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from '../models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Transaction[] = [];
  lastTransactionSender: any
  lastTransactionReceiver: any
  completeSender: boolean = false
  completeReceiver: boolean = false

  constructor(
    private fs: AngularFirestore
  ) { }

  makeTransaction(transaction: Transaction){
    transaction.id = this.fs.createId()
    return this.fs.collection<Transaction>("transactions").doc(transaction.id).set(transaction)
  }

  getTransactionsPerUser(id: string){
    this.transactions = []
    this.completeReceiver = false
    this.completeSender = false
    this.fs.collection<Transaction>("transactions", ref => ref.where("idSender", "==", id).orderBy("date", "desc").limit(2)).get().forEach(res => {
      this.lastTransactionSender = res.docs[res.docs.length - 1]
      for (let transaction of res.docs){
        this.transactions.push(transaction.data())
      }
      if(res.docs.length < 3){
        this.completeSender = true
      }
    }).then(() => {
      this.fs.collection<Transaction>("transactions", ref => ref.where("idReceiver", "==", id).orderBy("date", "desc").limit(2)).get().forEach(res => {
        this.lastTransactionReceiver = res.docs[res.docs.length - 1]
        for (let transaction of res.docs){
          this.transactions.push(transaction.data())
        }
        if(res.docs.length < 3){
          this.completeReceiver = true
        }
      }).then(() => {
        this.transactions.sort((a,b) => b.date.seconds - a.date.seconds)
      })
    })


  }

  getMoreTransactionsPerUser(id: string){
    if(this.completeReceiver == false || this.completeSender == false){
      if(this.completeSender == false){
        this.fs.collection<Transaction>("transactions", ref => ref.where("idSender", "==", id).orderBy("date", "desc").startAfter(this.lastTransactionSender).limit(2)).get().forEach(res => {
          this.lastTransactionSender = res.docs[res.docs.length - 1]
          for (let transaction of res.docs){
            this.transactions.push(transaction.data())
          }
          if(res.docs.length < 3){
            this.completeSender = true
          }
        })
      }
      if(this.completeReceiver == false){
        this.fs.collection<Transaction>("transactions", ref => ref.where("idReceiver", "==", id).orderBy("date", "desc").startAfter(this.lastTransactionReceiver).limit(2)).get().forEach(res => {
          this.lastTransactionReceiver = res.docs[res.docs.length - 1]
          for (let transaction of res.docs){
            this.transactions.push(transaction.data())
          }
          if(res.docs.length < 3){
            this.completeReceiver = true
          }

        })
      }
      this.transactions.sort((a,b) => b.date.seconds - a.date.seconds)
    }
  }
  
}
