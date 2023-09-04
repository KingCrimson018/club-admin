import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models.ts/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-individual-transactions',
  templateUrl: './individual-transactions.component.html',
  styleUrls: ['./individual-transactions.component.scss'],
})
export class IndividualTransactionsComponent  implements OnInit {
  @Input() transaction!: Transaction
  date!: Date
  constructor(
    public userS: UserService
  ) {
   
    
   }

  ngOnInit() {
    this.date = new Date(this.transaction.date.seconds * 1000);
  }

}
