import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindPostcodeAddressRoutingModule } from './find-postcode-address-routing.module';
import { FindPostcodeAddressComponent } from './find-postcode-address.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [FindPostcodeAddressComponent],
  imports: [
    CommonModule,
    FindPostcodeAddressRoutingModule,

    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAfJTVKnpLl0ULuuwDuix-9ANpyQhP6mfc',
       libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class FindPostcodeAddressModule { }
