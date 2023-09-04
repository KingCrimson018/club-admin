import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models.ts/models';

@Component({
  selector: 'app-full-transaction',
  templateUrl: './full-transaction.component.html',
  styleUrls: ['./full-transaction.component.scss'],
})
export class FullTransactionComponent  implements OnInit {
  @Input() transaction!: Transaction
  date!: Date
  constructor() { }

  ngOnInit() {
    this.date = new Date(this.transaction.date.seconds * 1000)
  }

}
