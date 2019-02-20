import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { OmdbApiService } from 'src/app/shared/services/omdb/omdb-api.service';
import {ISearchResponce } from '../../shared/models/search-responce';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-find-film',
  templateUrl: './find-film.component.html',
  styleUrls: ['./find-film.component.css']
})
export class FindFilmComponent implements OnInit {

  // get reference on search page field
  @ViewChild('inputPage') inputPage: ElementRef;

  public searchControl = new FormControl('');
  public searchResponce: ISearchResponce;
  public autocompleteSearch$ : Observable<string[]>;  
  public filteredOptions$: Observable<string[]>;
  public selectedId: string;
  public filmArray$ = JSON.parse(localStorage.getItem("loadedChildren"))
  public pagination = JSON.parse(localStorage.getItem("pagination")) ||
        {currentPageNmb: 1, totalResult:0, pagesAmount:0};
  public options: string[] = this._getSearchRequests() ?
        this._getSearchRequests() : ['venom', 'deadpool 2', 'aquamen'];
  public isResponce = localStorage.getItem("loadedChildren");

  constructor(
    private httpService: OmdbApiService,
    private route: ActivatedRoute,
    public authService: AuthService,
    public router : Router ){ }
  

  ngOnInit() {

    // track changes in input field and filter the options list
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
      );


    // AutoSearch with input value changes
    // Set observable to "autocompleteSearch$"
    // Save "searchRequest" to can make 'Prev' and 'Next' after reload page
    this.autocompleteSearch$ = this.searchControl.valueChanges.pipe(

      // clear "loadedChildren" list
      tap(() => { localStorage.setItem("loadedChildren", "[]") }),
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap(page => this.httpService.filmAutocomplete(page, 1)),
      tap((resp ) => {
        localStorage.setItem("searchRequest", this.searchControl.value);

        // For each film make "searchOneChildren" request to get their genre
        // and other data
        let item = resp["Search"];
        if (item){
          item.forEach(film => { this.searchOneChildren(film.imdbID) })
        }}),
      );

    // subscribe to "autocompleteSearch$" observable
    // save "pagination" data to "localStorage"
    this.autocompleteSearch$
      .subscribe(
        res => {
          console.log('Server responce: ', res);
          this.pagination.totalResult = res["totalResults"];
          this.pagination.pagesAmount = Math.ceil(res["totalResults"]/10);
          this.pagination.currentPageNmb = 1;
          localStorage.setItem('pagination', JSON.stringify(this.pagination ));
          },
        err => {
          console.log('ERROR!: ', err);
        }
      );
      
      // make "filmArray" an Observable
      this.arrayToObs(this.filmArray$)
  }
  // end NgOnInit ---------





   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  // get odservable from array
  public arrayToObs(array){
    this.filmArray$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('imdbID');
        return of(array);
      })
    );
  }




  // -------------handlers ----------------

  // "request" button to save request value from input in "LocalStorage"
  public handleRequest(){
    this._saveSearchRequest(this.searchControl.value);
  }

  private _getSearchRequests(){
    return JSON.parse(localStorage.getItem('searchRequests'));
  }

  private _saveSearchRequest(value){
    if (!this.options.includes(value) && value) {
      this.options.push(value);
    }
    localStorage.setItem('searchRequests', JSON.stringify(this.options));
  }

  public handlePrev() {
    this.pagination.currentPageNmb !== 1 ? this.pagination.currentPageNmb -=1 :  null
    localStorage.setItem('pagination', JSON.stringify(this.pagination ));
    this.makePrevNextToRequest(false);
  }

  public handleNext() {
    this.pagination.currentPageNmb < this.pagination.totalResult/10 ? this.pagination.currentPageNmb +=1 :  null
    localStorage.setItem('pagination', JSON.stringify(this.pagination ));
    this.makePrevNextToRequest(false);
  }
  
  public handleGoTo(){
    this.pagination.currentPageNmb = +this.inputPage.nativeElement.value;
    localStorage.setItem('pagination', JSON.stringify(this.pagination ));
    this.makePrevNextToRequest(true);
  }
  // end handlers ---------




  
  public makePrevNextToRequest(isGoToHandler:boolean){
    // check whatever this is "isGoToHandler" clicked
    // get search current search request from "localStorage"
    let page = isGoToHandler ? this.inputPage.nativeElement.value : this.pagination.currentPageNmb;
    let searchRequest = this.searchControl.value || localStorage.getItem("searchRequest");


    // make request to get next, previos 10 films results or results from some page
    this.httpService.filmAutocomplete(searchRequest, page)
    .pipe(
      tap((resp ) => {
        localStorage.setItem("loadedChildren", "[]");  //move this string here from above
        let item = resp["Search"];
          item.forEach(film => {
          this.searchOneChildren(film.imdbID);
        })
      })
    )
    .subscribe(
      res => {
        console.log('Server responce: ', res);
        this.pagination.totalResult = res["totalResults"];
        this.pagination.pagesAmount = Math.ceil(res["totalResults"]/10);
        localStorage.setItem('pagination', JSON.stringify(this.pagination ));
      },
      err => { console.log('ERROR!: ', err) });
  }

  public searchOneChildren(id){
    return this.httpService.getFilmById(id)
    .subscribe(
      res => {
        console.log('Server responce: ', res);
        let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren"));
        loadedChildren.push(res.body);
        localStorage.setItem("loadedChildren", JSON.stringify(loadedChildren));
         
        this.arrayToObs(loadedChildren);
        localStorage.setItem("initialReload", "true");
      },
      err => { console.log('ERROR!: ', err) });
  }
}
