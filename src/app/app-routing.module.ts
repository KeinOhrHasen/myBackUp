import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', loadChildren: './authentication/sign-in/sign-in.module#SignInModule'},
  { path: 'register-user', loadChildren: './authentication/sign-up/sign-up.module#SignUpModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'forgot-password', loadChildren: './authentication/forgot-password/forgot-password.module#ForgotPasswordModule'},
  { path: 'verify-email-address',  loadChildren: './authentication/verify-email/verify-email.module#VerifyEmailModule'},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
