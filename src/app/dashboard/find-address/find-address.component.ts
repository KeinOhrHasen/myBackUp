import { Component, OnInit } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { MapsAPILoader } from '@agm/core';
// import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
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

  lat: number = -33.785809;
  lng: number = 151.121195;

  public searchControl = new FormControl('');


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    ) {  }


  public handleAddressChange(address: any) {
      console.log(address.geometry.location.lng());
      console.log(address.geometry.location.lat());
      console.log(address.geometry.location.toJSON());
      console.log(address.geometry.viewport.getNorthEast());
      this.lng = address.geometry.location.lng();
      this.lat  = address.geometry.location.lat();
  }

  handleClick(){
    navigator.geolocation.getCurrentPosition( position => {
      this.lng = +position.coords.longitude
      this.lat = +position.coords.latitude
    })
  }


  ngOnInit() {

  }
}
