import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  // { path: 'socs', loadChildren: './socs/socs.module#SocsPageModule'}, //, canLoad: [AuthGuard]
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'view-soc',
    loadChildren: () => import('./private/view-soc/view-soc.module').then( m => m.ViewSocPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'take-soc',
    loadChildren: () => import('./private/take-soc/take-soc.module').then( m => m.TakeSocPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'review-soc',
    loadChildren: () => import('./private/review-soc/review-soc.module').then( m => m.ReviewSocPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./private/leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'my-results/:userId',
    loadChildren: () => import('./private/my-results/my-results.module').then( m => m.MyResultsPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'review-progression',
    loadChildren: () => import('./private/review-progression/review-progression.module').then( m => m.ReviewProgressionPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'my-progression/:userId',
    loadChildren: () => import('./private/my-progression/my-progression.module').then( m => m.MyProgressionPageModule),
      canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
