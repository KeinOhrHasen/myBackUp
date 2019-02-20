import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Film } from '../../models/film';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  private readonly urlOmdb = 'http://www.omdbapi.com';
  private readonly urlPostcode = 'https://postcodes.io';
  private readonly apikey = 'b04f42ef';

  constructor(private httpClient: HttpClient) { }

  
  // Autocomplete film Search
  filmAutocomplete(search: string, page:number): Observable<string[]> { 
    return this.httpClient
      .get<string[]>(
        `${this.urlOmdb}/?s=${search}&page=${page}&apikey=${this.apikey}`)
      .pipe(
        retry(3),
        catchError(this._handleError),
        map(( result ) => result)
        );
  }


  // film Search by id
  getFilmById(id: string) {
    return this.httpClient
      .get<Film>(
        `${this.urlOmdb}/?i=${id}&apikey=${this.apikey}`,
        { observe: 'response' })
      .pipe(
        catchError(this._handleError),
      );
  }


  // Autocomplete a postcode partial
  postcodeAutocomplete(search: string): Observable<string[]> {
    // forbid empty requests
    if(search.length === 0){search='NotValid'}
    return this.httpClient
      .get<any>(
        `${this.urlPostcode}/postcodes/${search}/autocomplete`)
      .pipe(
        retry(3),
        catchError(this._handleError),
        map(({ result }) => result));
  }


  // Lookup a postcode
  lookupPostcode(search) {
    return this.httpClient
      .get<any>(
        `${this.urlPostcode}/postcodes/${search}`,
        { observe: 'response' })
      .pipe(
        catchError(this._handleError))

  }


  // Http Error handler
  private _handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err);
  }
}


