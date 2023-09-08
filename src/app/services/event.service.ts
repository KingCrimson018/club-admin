import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Event[] = []
  constructor(
    private fs: AngularFirestore
  ) {

   }
   addEvent(event: Event){
    event.id = this.fs.createId()
    return this.fs.collection<Event>("events").doc(event.id).set(event)
   }
   getEvents(idClub: string, status?: boolean){
    this.events = []
    if(status == true){
      return this.fs.collection<Event>("events", ref => ref.where("idClub", "==", idClub).where("complete", "==", true).orderBy("date", "desc")).get().forEach(res => {
        res.docs.forEach(event => {
          this.events.push(event.data())
        })
      }).then(() => {
        this.formatDate()
      })
    }else if(status == false){
      return this.fs.collection<Event>("events", ref => ref.where("idClub", "==", idClub).where("complete", "==", false).orderBy("date", "desc")).get().forEach(res => {
        res.docs.forEach(event => {
          this.events.push(event.data())
        })
      }).then(() => {
        this.formatDate()
      })
    }else{
      return this.fs.collection<Event>("events", ref => ref.where("idClub", "==", idClub).orderBy("date", "desc")).get().forEach(res => {
        res.docs.forEach(event => {
          this.events.push(event.data())
        })
      }).then(() => {
        this.formatDate()
      })
    }
   }

  deleteEvent(event: Event){
    return this.fs.collection<Event>("events").doc(event.id).delete()
  }
  completeEvent(event: Event){
    return this.fs.collection<Event>("events").doc(event.id).update({complete: true})
  }



  private formatDate(){
    for(let event of this.events){
      event.date = new Date(event.date.seconds * 1000)
      console.log(event.date);
    }
  }
}
