import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component'
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'find-film', loadChildren: './find-film/find-film.module#FindFilmModule'},
  {path: 'find-address', loadChildren: './find-address/find-address.module#FindAddressModule'},
  {path: 'find-postcode-address', loadChildren: './find-postcode-address/find-postcode-address.module#FindPostcodeAddressModule'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
