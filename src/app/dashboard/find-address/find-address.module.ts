import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindAddressRoutingModule } from './find-address-routing.module';
import { FindAddressComponent } from './find-address.component'

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FindAddressComponent],
  imports: [
    CommonModule,
    FindAddressRoutingModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAfJTVKnpLl0ULuuwDuix-9ANpyQhP6mfc',
       libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FindAddressModule {


}
