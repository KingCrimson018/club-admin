import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MakeTransactionComponent } from '../general-modals/make-transaction/make-transaction.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private modalCtrl: ModalController
  ) {}



  async openAdd(){
    let modal = await this.modalCtrl.create({
      component: MakeTransactionComponent,
      cssClass: 'modal'
    })

    await modal.present()
  }

}
