import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Club, User } from 'src/app/models.ts/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';


import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.page.html',
  styleUrls: ['./add-director.page.scss'],
})
export class AddDirectorPage implements OnInit {
  clubName: string = ""
  clubs: Club[] = []
  userForm!: FormGroup
  idPhoto: string = ""
  urlPhoto: string = ""

  constructor(
    private fb: FormBuilder,
    private userS: UserService,
    private adminS: AdminService,
    private fs: AngularFirestore,
    private storageS: StorageService

  ) {
    this.userForm = this.fb.group({
      "idClub": ["", Validators.required],
      "email": ["", Validators.required],
      "password": ["", Validators.required],
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "zone": ["", Validators.required]
    })
    
   }

  ngOnInit() {
    this.idPhoto = this.fs.createId()
  }

  // Photos Functions

  uploadPhoto(event: any){
    this.storageS.uploadImg(`users/${this.idPhoto}/photo`, event.target.files[0]).then(() => {
      this.storageS.getImgUrl(`users/${this.idPhoto}/`).subscribe(async res => {
        this.urlPhoto = await res.items[0].getDownloadURL()
      })
    })
  }

  deletePhoto(){
    this.storageS.deleteImg(`users/${this.idPhoto}`)
  }


  addDirector(){
    let newDirector: User = {
      id: '',
      idClub: this.userForm.value.idClub,
      email: this.userForm.value.email,
      role: 'director',
      imgProfile: {
        idPhoto: this.idPhoto,
        urlPhoto: this.urlPhoto
      },
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      total: 0,
      clubName: this.clubName
    }

    this.userS.addUser(newDirector, this.userForm.value.password)
  }
  getClubs(){
    this.adminS.getClubsByZone(this.userForm.value.zone).forEach(res => {
      for(let club of res.docs){
        this.clubs.push(club.data())
        console.log(this.clubs);
        
      }
    })
    
  }

  setClubName(clubName: string){
    this.clubName = clubName
  }

}
