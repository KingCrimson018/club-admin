import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    private userS: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    setTimeout(() => {
      if(!this.userS.logged){
        this.router.navigate(['login'])
      }else if(this.userS.logged.role == "member"){
        this.router.navigate(['tabs/index'])
      }else if(this.userS.logged.role == "admin"){
        this.router.navigate(['admin-tabs/index'])
      }else{
        this.router.navigate(['directive-tabs/index'])
      }
    }, 2000)
  }

}
