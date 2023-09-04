import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddUserModalComponent } from 'src/app/directive-components/add-user-modal/add-user-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private userS: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addUser(){
    let modal = await this.modalController.create({
      component: AddUserModalComponent
    }) 

    await modal.present()
  }
  logOut(){
    this.userS.logOut().then(() => {
      this.router.navigate(['login']).then(() => {
        location.reload()
      })
    })
  }

}
