import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Club } from 'src/app/models.ts/models';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  zone: string = ""
  clubId: string = "" 
  clubs: Club[] = []
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll
  constructor(
    public adminS: AdminService
  ) { }

  ngOnInit() {
    if(this.adminS.maxMembers){
      this.infiniteScroll.disabled = true
    }
  }


  filter(){
    this.adminS.members = []
    this.adminS.maxMembers = false
    this.adminS.maxMembers = false
    this.adminS.getMembers(this.zone, this.clubId)
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
  getMoreMembers(){
    if(this.adminS.maxMembers){
      this.infiniteScroll.disabled = true
    }else{
      this.adminS.getMembers(this.zone, this.clubId,this.adminS.members[this.adminS.members.length - 1])
    }
    
  }
  
}
