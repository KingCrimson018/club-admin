import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  status: string = ""
  constructor(
    public eventS: EventService,
    private userS: UserService,
  ) { }

  ngOnInit() {
  }

  filter(){
    if(this.status == ""){
      this.eventS.getEvents(this.userS.logged?.idClub || "")
    }else if(this.status == "true"){
      this.eventS.getEvents(this.userS.logged?.idClub || "", true)
    }else {
      this.eventS.getEvents(this.userS.logged?.idClub || "", false)
    }
  }


}
