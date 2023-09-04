import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models.ts/models';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(
    private fs: AngularFirestore
  ) { }

  getUsersPerClub(id: string){
    return this.fs.collection<User>('users', ref => ref.where("idClub", "==", id)).get()
  }
}
