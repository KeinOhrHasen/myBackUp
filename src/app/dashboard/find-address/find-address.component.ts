import { Component, OnInit } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

import { ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-find-address',
  templateUrl: './find-address.component.html',
  styleUrls: ['./find-address.component.css']
})
export class FindAddressComponent implements OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('inputPage') inputPage: ElementRef;

  lat: number = 48.151667;
  lng: number = 24.813611;

  public searchControl = new FormControl('');


  // Autocomplete address handler
  public handleAddressChange(address: any) {
      console.log(address.geometry.location.lng());
      console.log(address.geometry.location.lat());
      console.log(address.geometry.location.toJSON());
      console.log(address.geometry.viewport.getNorthEast());
      this.lng = address.geometry.location.lng();
      this.lat  = address.geometry.location.lat();
  }

  // Find me button handler
  public handleClick(){
    // get users positiom from navigator
    navigator.geolocation.getCurrentPosition( position => {
      // forvard to users position on the Google map
      this.lng = +position.coords.longitude
      this.lat = +position.coords.latitude
    })
  }

  
  ngOnInit() { }
}
