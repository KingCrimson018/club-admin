import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private userS: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.userS.logOut().then(() => {
      this.router.navigate(['login']).then(() => {
        location.reload()
      })
    })
  }
}
