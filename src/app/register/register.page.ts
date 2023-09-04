import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models.ts/models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private userS: UserService,
  ) {
    this.userForm = this.fb.group({
      "email": ["", Validators.required],
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "password": ["", Validators.required],
    })
   }

  ngOnInit() {
  }

  createUser(){
    let user: User = {
      id: '',
      idClub: 'admin',
      email: this.userForm.value.email,
      role: 'admin',
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      total: 0,
      clubName: 'admin'
    }

    this.userS.addUser(user, this.userForm.value.password)
  }
}
