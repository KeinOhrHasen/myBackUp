import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent} from './forgot-password.component'
import { SecureInnerPagesGuard } from "../../shared/guards/secure-inner-pages.guard";


const routes: Routes = [
  {path: "", component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
