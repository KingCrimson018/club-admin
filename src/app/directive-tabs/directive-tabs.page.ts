import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MakeDepositModalComponent } from '../directive-components/make-deposit-modal/make-deposit-modal.component';

@Component({
  selector: 'app-directive-tabs',
  templateUrl: './directive-tabs.page.html',
  styleUrls: ['./directive-tabs.page.scss'],
})
export class DirectiveTabsPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal(){
    let modal = await this.modalController.create({
      component: MakeDepositModalComponent
    })
    await modal.present()
  }

}
