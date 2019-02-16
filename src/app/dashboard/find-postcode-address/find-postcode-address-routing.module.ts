import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindPostcodeAddressComponent } from './find-postcode-address.component';

const routes: Routes = [
  {path: '', component: FindPostcodeAddressComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindPostcodeAddressRoutingModule { }
