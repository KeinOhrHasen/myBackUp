import { Component, OnInit } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { OmdbApiService } from '../../shared/services/omdb/omdb-api.service';
import { Observable, of } from 'rxjs';
import { startWith, map, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-find-postcode-address',
  templateUrl: './find-postcode-address.component.html',
  styleUrls: ['./find-postcode-address.component.css']
})
export class FindPostcodeAddressComponent implements OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('inputPage') inputPage: ElementRef;

  lat: number = -33.785809;
  lng: number = 151.121195;


  // public options: string[] = this._getSearchRequests() ? this._getSearchRequests()  : ['venom', 'deadpool 2', 'aquamen'];
  public filteredOptions$: Observable<string[]>;
  public request$;
  public searchControl = new FormControl('');
  public responce:any;
  // public auto\\\


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private httpService: OmdbApiService,
    ) {  }


  // public handleAddressChange(address: any) {
  //     console.log(address.geometry.location.lng());
  //     console.log(address.geometry.location.lat());
  //     console.log(address.geometry.location.toJSON());
  //     console.log(address.geometry.viewport.getNorthEast());
  //     this.lng = address.geometry.location.lng();
  //     this.lat  = address.geometry.location.lat();
  // }

  handleClick(){
    navigator.geolocation.getCurrentPosition( position => {
      this.lng = +position.coords.longitude
      this.lat = +position.coords.latitude
    })
  }


  ngOnInit() {
    this.request$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => this.httpService.postcodeAutocomplete(search)),
      tap((array) => {if (array.length === 1 ){
        
      }})
      )
      .subscribe(
        res => {
          this.filteredOptions$ = of(res)
          console.log('Server responce: ', res);
          this.responce = {result:res};
          if (res.length === 1) {
            this.httpService.lookupPostcode(res[0])
            .subscribe(
              (childResponce)=>{
                console.log(childResponce)
                this.lng = +childResponce.body.result.longitude
                this.lat = +childResponce.body.result.latitude
            })

            
          }     

          },
        err => {
          console.log('ERROR!: ', err);
          this.responce = {status: err.status, result:null} 
        }
      );
  }
}

