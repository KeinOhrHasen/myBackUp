import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';
import { SecureInnerPagesGuard } from "../../shared/guards/secure-inner-pages.guard";


const routes: Routes = [
  {path: "", component: SignUpComponent, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
