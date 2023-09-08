import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GeneralGuardGuard } from './guards/general-guard.guard';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { DirectiveGuardGuard } from './guards/directive-guard.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./boarding/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./boarding/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NotLoggedGuard],
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [GeneralGuardGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'add-user',
    loadChildren: () => import('./club-administration/add-user/add-user.module').then( m => m.AddUserPageModule),
    canActivate: [DirectiveGuardGuard]
  },
  {
    path: 'directive-tabs',
    loadChildren: () => import('./directive-tabs/directive-tabs.module').then( m => m.DirectiveTabsPageModule),
    canActivate: [DirectiveGuardGuard]
  },
  {
    path: 'admin-tabs',
    loadChildren: () => import('./admin-tabs/admin-tabs.module').then( m => m.AdminTabsPageModule),
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'add-club',
    loadChildren: () => import('./admin-views/add-club/add-club.module').then(m => m.AddClubPageModule),
    canActivate: [AdminGuardGuard]  
  }, 
  {
    path: 'add-director',
    loadChildren: () => import('./admin-views/add-director/add-director.module').then(m => m.AddDirectorPageModule),
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'directive-events',
    loadChildren: () => import('./directive-views/events/events.module').then( m => m.EventsPageModule),
    canActivate: [DirectiveGuardGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./general-views/events/events.module').then( m => m.EventsPageModule),
    canActivate: [GeneralGuardGuard]
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
