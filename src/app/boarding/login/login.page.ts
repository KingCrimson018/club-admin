import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email!: string
  password!: string
  constructor(
    private userS: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logIn(){
    return this.userS.logIn(this.email, this.password).then(() => {

      
    })
  }

}
