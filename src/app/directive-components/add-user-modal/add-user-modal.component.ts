import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models.ts/models';
import { ClubService } from 'src/app/services/club.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent  implements OnInit {
  userForm!: FormGroup
  storedPassword: string = ""
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private userS: UserService,
    private clubS: ClubService,
    private alertController: AlertController
  ) { 
    this.userForm = this.fb.group({
      "email": ["", Validators.required],
      "role": ["", Validators.required],
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "password": ["", Validators.required]
    })
  }

  ngOnInit() {}

  addUser(){
    let newUser: User = {
      id: '',
      idClub: this.userS.logged?.idClub || "s",
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      total: 0,
      clubName: this.clubS.club?.name || "",
      clubZone: this.clubS.club?.zone || ""
    }
    this.userS.addUser(newUser, this.userForm.value.password, this.userS.storedPassword).then(() => {
      this.close()
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
            
            this.addUser()
          }
        }
      ]
    })
    await alert.present()
  }

  decideToAdd(){
    if(this.userS.storedPassword){
      this.addUser()
    }else{
      this.showAlert()
    }
  }

  close(){
    this.modalController.dismiss()
  }
}
