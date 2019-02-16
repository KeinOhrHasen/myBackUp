import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
// import { SignInComponent } from './Authentication/sign-in/sign-in.component';
// import { SignUpComponent } from './authentication/sign-up/sign-up.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { NotFoundComponent } from './not-found/not-found.component';


// Import canActivate guard services
// import { AuthGuard } from "./shared/guards/auth.guard";
// import { SecureInnerPagesGuard } from "./shared/guards/secure-inner-pages.guard";

// Include route guard in routes array
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
