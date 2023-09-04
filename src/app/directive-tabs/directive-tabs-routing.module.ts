import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectiveTabsPage } from './directive-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DirectiveTabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
      }
    ]

  },
  {
    path: '',
    redirectTo: 'directive-tabs/index',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectiveTabsPageRoutingModule {}
