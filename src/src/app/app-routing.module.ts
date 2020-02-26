import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'socs', loadChildren: './socs/socs.module#SocsPageModule'}, //, canLoad: [AuthGuard]
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
