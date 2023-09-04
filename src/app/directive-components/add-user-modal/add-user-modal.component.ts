import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models.ts/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent  implements OnInit {
  userForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private userS: UserService
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
      clubName: this.userS.logged?.clubName || ""
    }
    this.userS.addUser(newUser, this.userForm.value.password).then(() => {
      this.close()
    }) 
  }
  close(){
    this.modalController.dismiss()
  }
}
