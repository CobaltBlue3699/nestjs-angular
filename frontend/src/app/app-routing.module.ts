import { LoginGuard } from './core/guard/login.guard';
import { LoginComponent } from './login/login.component';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * 控制ui
 * showHeader:  boolean, default true
 * showSidebar: boolean, default true
 * showFooter:  boolean, default true
 *
 * 控制登入狀態
 * neededLogin: default true, if user not login, system will navigate to login page
 *              set to false: if user login, system will navigate to dashboard.
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      showSidebar: false,
      showHeader: true,
      neededLogin: false
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canLoad: [LoginGuard],
    data: {
      showFooter: false,
    }
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(mod => mod.PersonalModule),
    canLoad: [LoginGuard],
    data: {
      showFooter: false,
      showSidebar: false
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, // 使用 #
    enableTracing: !environment.production // 這會把每個轉導中發生的事件都輸出到瀏覽器
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
