import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'view-soc', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  // { path: 'socs', loadChildren: './socs/socs.module#SocsPageModule'}, //, canLoad: [AuthGuard]
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'view-soc',
    loadChildren: () => import('./private/view-soc/view-soc.module').then( m => m.ViewSocPageModule)
  },
  {
    path: 'take-soc',
    loadChildren: () => import('./private/take-soc/take-soc.module').then( m => m.TakeSocPageModule)
  },
  {
    path: 'review-soc',
    loadChildren: () => import('./private/review-soc/review-soc.module').then( m => m.ReviewSocPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./private/leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'my-results/:userId',
    loadChildren: () => import('./private/my-results/my-results.module').then( m => m.MyResultsPageModule)
  },
  {
    path: 'review-progression',
    loadChildren: () => import('./private/review-progression/review-progression.module').then( m => m.ReviewProgressionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
