import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Event } from 'src/app/models.ts/models';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
})
export class AddEventModalComponent  implements OnInit {
  date: any
  eventForm!: FormGroup

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private userS: UserService,
    private eventS: EventService
  ) {
    this.eventForm = this.fb.group({
      "title": ["", Validators.required],
      "description": ["", Validators.required],
      "date": [Validators.required],
    })
   }

  ngOnInit() {
    console.log(new Date("DD.MM.YYYY HH:mm").toString());
    
  }

  showDate(){
    console.log(new Date(this.eventForm.value.date));
  }

  close(){
    this.modalController.dismiss()
  }

  addEvent(){
    let newEvent: Event = {
      id: '',
      idClub: this.userS.logged?.idClub || "",
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      date: new Date(this.eventForm.value.date),
      complete: false
    }

    this.eventS.addEvent(newEvent).then(() => {
      this.close()
    })
  }
}
