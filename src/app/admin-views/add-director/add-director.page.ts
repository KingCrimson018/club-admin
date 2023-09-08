import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Club, User } from 'src/app/models.ts/models';
import { AdminService } from 'src/app/services/admin.service';



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
    private router: Router,
    private alertController: AlertController


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
      clubName: this.clubName,
      clubZone: this.userForm.value.zone
    }

    this.userS.addUser(newDirector, this.userForm.value.password, this.userS.storedPassword).then(() => {
      this.router.navigate(['admin-tabs/index'])
    })
  }
  getClubs(){
    this.adminS.getClubsByZone(this.userForm.value.zone).forEach(res => {
      for(let club of res.docs){
        this.clubs.push(club.data())
        console.log(this.clubs);
        
      }
    })
    
  }
  async showAlert(){
    const alert = await this.alertController.create({
      header: "Atention",
      message: "Please enter your password to continue",
      inputs: [
        {
          placeholder: "Password: ",
          type: "password",
          name: "storedPassword"
          
        }
      ],
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          handler: (alertData) => {
            this.userS.storedPassword = alertData.storedPassword
            
            this.addDirector()
          }
        }
      ]
    })
    await alert.present()
  }


  decideToAdd(){
    if(this.userS.storedPassword){
      this.addDirector()
    }else{
      this.showAlert()
    }
  }

  setClubName(clubName: string){
    this.clubName = clubName
  }

}
