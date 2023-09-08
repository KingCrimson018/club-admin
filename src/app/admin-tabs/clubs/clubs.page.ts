import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage implements OnInit {
  zone: string = ""
  lessThan: number = 0
  greaterThan: number = 0

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  constructor(
    public adminS: AdminService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      if(this.adminS.clubs.length <= 0){
        this.infiniteScroll.disabled = true
      }
    },100)
  }

  filter(){
    this.adminS.clubs = []
    this.adminS.maxClubs = false
    if(this.zone != ""){
      this.adminS.getClubs(this.zone)
    }else{
      this.adminS.getClubs("")
    }
  }

  keepGeneratingClubs(){
    if(this.adminS.maxClubs){
      this.infiniteScroll.disabled = true
    }else{
      if(this.zone != ""){
        this.adminS.getClubs(this.zone, this.adminS.clubs[this.adminS.clubs.length - 1])
      }else{
        this.adminS.getClubs("", this.adminS.clubs[this.adminS.clubs.length - 1])
      }
    }

  }
}
