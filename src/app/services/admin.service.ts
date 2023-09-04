import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Club, User } from '../models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //Tops//
  top3Clubs: Club[] = []
  top3Users: User[] = []

  //Clubs
  clubs: Club[] = []
  maxClubs: boolean = false

  //Members
  members: User[] = []
  maxMembers: boolean = false
  constructor(
    private fs: AngularFirestore
  ) {
    this.getTop3ClubsByBalance()
    this.getTop3MembersByBalance()

   }

  addClub(club: Club){
    club.id = this.fs.createId()
    return this.fs.collection<Club>("clubs").doc(club.id).set(club)
  }

  getClubsByZone(zone: string){
    return this.fs.collection<Club>("clubs", ref => ref.where("zone", "==", zone).orderBy("name")).get()
  }
  getTop3ClubsByBalance(){
    return this.fs.collection<Club>("clubs", ref => ref.orderBy("total", "desc").limit(3)).get().forEach(res => {
      for(let club of res.docs){
        this.top3Clubs.push(club.data())
      }
    })
  }
  getTop3MembersByBalance(){
    return this.fs.collection<User>("users", ref => ref.orderBy("total", "desc").limit(3)).get().forEach(res => {
      for(let user of res.docs){
        this.top3Users.push(user.data())
      }
    })
  }

  getClubs(zone?: string,startAfter?: any){
    if(this.maxClubs == false){
      if(zone != ""){
        if(startAfter){
          return this.fs.collection<Club>("clubs", ref => ref.orderBy("name").where("zone", "==", zone).startAfter(startAfter).limit(10)).get().forEach(res => {
            if(res.docs.length < 10){
              this.maxClubs = true
            }
            for(let club of res.docs){
              this.clubs.push(club.data())
            }
          })
        }else{
          return this.fs.collection<Club>("clubs", ref => ref.orderBy("name").where("zone", "==", zone).limit(10)).get().forEach(res => {
            if(res.docs.length < 10){
              this.maxClubs = true
            }
            for(let club of res.docs){
              this.clubs.push(club.data())
            }
          })
        }
      }else{
        if(startAfter){
          return this.fs.collection<Club>("clubs", ref => ref.orderBy("name").startAfter(startAfter).limit(10)).get().forEach(res => {
            if(res.docs.length < 10){
              this.maxClubs = true
            }
            for(let club of res.docs){
              this.clubs.push(club.data())
            }
          })
        }else{
          return this.fs.collection<Club>("clubs", ref => ref.orderBy("name").limit(10)).get().forEach(res => {
            if(res.docs.length < 10){
              this.maxClubs = true
            }
            for(let club of res.docs){
              this.clubs.push(club.data())
            }
          })
        }
      }
    }else{
      return null
    }
  }

  getMembers(zone: string, idClub: string, startAfter?: any){
    if(this.maxMembers == false){
      if(zone != "" && idClub != ""){
       if(startAfter){
        return this.fs.collection<User>("users", ref => ref.where("idClub", "==", idClub).orderBy("total", "desc").startAfter(startAfter).limit(15)).get().forEach(res => {
          if(res.docs.length < 15){
            this.maxMembers = true
          }
          for(let member of res.docs){
            this.members.push(member.data())
          }
        })
       }else{
        return this.fs.collection<User>("users", ref => ref.where("idClub", "==", idClub).orderBy("total", "desc").limit(15)).get().forEach(res => {
          if(res.docs.length < 15){
            this.maxMembers = true
          }
          for(let member of res.docs){
            this.members.push(member.data())
          }
        })
       }
      }else if(zone != "" && idClub == ""){
        if(startAfter){
          return this.fs.collection<User>("users", ref => ref.where("clubZone", "==", zone).orderBy("total", "desc").startAfter(startAfter).limit(15)).get().forEach(res => {
            if(res.docs.length < 15){
              this.maxMembers = true
            }
            for(let member of res.docs){
              this.members.push(member.data())
            }
          })
        }else{
          return this.fs.collection<User>("users", ref => ref.where("clubZone", "==", zone).orderBy("total", "desc").limit(15)).get().forEach(res => {
            if(res.docs.length < 15){
              this.maxMembers = true
            }
            for(let member of res.docs){
              this.members.push(member.data())
            }
          })
        }
      }else{
        if(startAfter){
          return this.fs.collection<User>("users", ref => ref.orderBy("total", "desc").startAfter(startAfter).limit(15)).get().forEach(res => {
            if(res.docs.length < 15){
              this.maxMembers = true
            }
            for(let member of res.docs){
              this.members.push(member.data())
            }
          })
        }else{
          return this.fs.collection<User>("users", ref => ref.orderBy("total", "desc").limit(15)).get().forEach(res => {
            if(res.docs.length < 15){
              this.maxMembers = true
            }
            for(let member of res.docs){
              this.members.push(member.data())
            }
          })
        }
      }
    }else{
      return null
    }
  }
}
