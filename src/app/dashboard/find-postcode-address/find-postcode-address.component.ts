import { Component, OnInit } from '@angular/core';

import { ViewChild, ElementRef} from '@angular/core'; 
import { FormControl } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { OmdbApiService } from '../../shared/services/omdb/omdb-api.service';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-find-postcode-address',
  templateUrl: './find-postcode-address.component.html',
  styleUrls: ['./find-postcode-address.component.css']
})
export class FindPostcodeAddressComponent implements OnInit {

  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('inputPage') inputPage: ElementRef;

  lat: number = 51.507222;
  lng: number = -0.1275;

  public filteredOptions$: Observable<string[]>;
  public autocompleteInputObs$;
  public searchControl = new FormControl('');


  constructor( private httpService: OmdbApiService) { }


  handleClick(){
    navigator.geolocation.getCurrentPosition( position => {
      this.lng = +position.coords.longitude
      this.lat = +position.coords.latitude
    })
  }


  // Http Error handler
  private _handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err);
  }


  ngOnInit() {
    // First we send "postcodeAutocomplete" request based on users input
    // In case user choosed some postcode from autocomplete option or
    // option has only one item we will send "lookupPostcode" request 
    // Then we get longtitude and lattitude from responce and show
    // postcode point on Google Map automaticaly
    this.autocompleteInputObs$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => this.httpService.postcodeAutocomplete(search)),
      catchError(this._handleError)
      )
      .subscribe(
        res => {
          this.filteredOptions$ = of(res)
          console.log('Server responce: ', res);
          if (res) {
            if (res.length === 1){
            this.httpService.lookupPostcode(res[0])
            .subscribe(
              (childResponce)=>{
                this.lng = +childResponce.body.result.longitude
                this.lat = +childResponce.body.result.latitude
            })
          }}   
        },
        err => { console.log('ERROR!: ', err) }
      );
  }
}
