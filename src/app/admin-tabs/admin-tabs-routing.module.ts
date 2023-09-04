import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTabsPage } from './admin-tabs.page';
import { AdminGuardGuard } from '../guards/admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule),
        canActivate: [AdminGuardGuard]
      },
      {
        path: 'clubs',
        loadChildren: () => import('./clubs/clubs.module').then( m => m.ClubsPageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: '',
        redirectTo: 'admin-tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin-tabs/index',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsPageRoutingModule {}
