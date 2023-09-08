import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Event } from 'src/app/models.ts/models';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  date: Date[] = []
  status: string = ""
  constructor(
    public eventS: EventService,
    private userS: UserService,
    private actionSheetController: ActionSheetController
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

  completeEvent(event: Event){
    this.eventS.completeEvent(event).then(() => {
      this.filter()
    })
  }
  
  deleteEvent(event: Event){
    this.eventS.deleteEvent(event).then(() => {
      this.filter()
    })
  }

  closeActionSheet(){
    this.actionSheetController.dismiss()
  }


  async presentActionSheet(event: Event){
    let buttons = []
    if(event.complete == false){
      buttons = [
        {
          text: "Complete",
          icon: "checkbox-outline",
          handler: () => {
            this.completeEvent(event)
            this.closeActionSheet()
          }
        },
        {
          text: "Delete",
          icon: "trash-outline",
          handler: () => {
            this.deleteEvent(event)
            this.closeActionSheet()
          }
        },
        {
          text: "Cancel",
          icon: "close-outline",
          handler: () => {
            this.closeActionSheet()
          }
        }
      ]
    }else{
      buttons = [
        {
          text: "Delete",
          icon: "trash-outline",
          handler: () => {
            this.deleteEvent(event)
            this.closeActionSheet()
          }
        },
        {
          text: "Cancel",
          icon: "close-outline",
          handler: () => {
            this.closeActionSheet()
          }
        }
      ]
    }
    const actionSheet = await this.actionSheetController.create({
      header: "Actions",
      buttons: buttons
    })

    await actionSheet.present()
  }

}
