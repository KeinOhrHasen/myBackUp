import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindAddressComponent } from './find-address.component'

const routes: Routes = [
  {path: '', component: FindAddressComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindAddressRoutingModule { }
