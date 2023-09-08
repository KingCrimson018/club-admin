import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models.ts/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm!: FormGroup

  constructor(
    private userS: UserService,
    private fb: FormBuilder,
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

  ngOnInit() {

  }
  
  addUser(){
    let newUser: User = {
      id: '',
      idClub: this.userS.logged?.idClub || '',
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      total: 0,
      clubName: this.userS.logged?.clubName || ''
    }



    this.userS.addUser(newUser, this.userForm.value.password)
  }

  async showAlert(){
    const alert = await this.alertController.create({
      header: "Atention",
      message: "Please enter your password to continue",
      inputs: [
        {
          placeholder: "Password: ",
          type: "password",
        }
      ],
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          handler: () => {
            this.addUser()
          }
        }
      ]
    })
  }

}
