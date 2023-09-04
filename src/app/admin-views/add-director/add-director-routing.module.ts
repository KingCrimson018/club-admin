import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDirectorPage } from './add-director.page';

const routes: Routes = [
  {
    path: '',
    component: AddDirectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDirectorPageRoutingModule {}
