import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { OmdbApiService } from 'src/app/shared/services/omdb/omdb-api.service';



@Component({
  selector: 'app-find-film',
  templateUrl: './find-film.component.html',
  styleUrls: ['./find-film.component.css']
})
export class FindFilmComponent implements OnInit {

  @ViewChild('inputPage') inputPage: ElementRef;

  public searchControl = new FormControl('');
  public responce:any;
  public request$;
  public pagination = JSON.parse(localStorage.getItem("pagination")) || {currentPageNmb: 1, totalResult:0, pagesAmount:0};
  public filmArray$ = JSON.parse(localStorage.getItem("loadedChildren"))
  public selectedId: string;
  public options: string[] = this._getSearchRequests() ? this._getSearchRequests()  : ['venom', 'deadpool 2', 'aquamen'];
  public filteredOptions$: Observable<string[]>;

  ids= JSON.parse(localStorage.getItem("choosedIdArray")) || [];
  choosedFilms = JSON.parse(localStorage.getItem("choosedFilmArray")) || [];


  constructor(
    private httpService: OmdbApiService,
    private route: ActivatedRoute){}
  

  ngOnInit() {
    // track changes in input field and filter the options list
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
      );

    // AutoSearch with input value changes
    // set observable to request$ 
    this.request$ = this.searchControl.valueChanges.pipe(
      tap(() => { localStorage.setItem("loadedChildren", "[]") }),
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap(page => this.httpService.filmAutocomplete(page, 1)),
      tap((r ) => {
        console.log(r)
        // console.log(r["Search"]);
        // save searchRequest to can make 'Prev' and 'Next' after reload page
        localStorage.setItem("searchRequest", this.searchControl.value);
        let item = r["Search"];
        if (item){
          item.forEach(elem => { this.searchOneChildren(elem.imdbID) })
        };
        // console.log(this.filmArray$)
      }),
      );

    
    // subscribe to request$ observable
    this.request$
      .subscribe(
        res => {
          console.log('Server responce: ', res);
          this.responce = {result:res};         // get avay
          this.pagination.totalResult = res["totalResults"];
          this.pagination.pagesAmount = Math.ceil(res["totalResults"]/10);
          localStorage.setItem('pagination', JSON.stringify(this.pagination ));
          },
        err => {
          console.log('ERROR!: ', err);
          this.responce = {status: err.status, result:null} 
        }
      );

      this.filsToObs(this.filmArray$)
  }


  // request button to save request value from input in Local Storage
  handleRequest(){
    this._saveSearchRequest(this.searchControl.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public filsToObs(Array){
    this.filmArray$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('imdbID');
        return of(Array);
      })
    );
  }


  // -------------handlers ----------------


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

  // someMethod(event) {
  //   console.log('from child !!!')
  // }

  public selectHandler(event){
    
    let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren")) || [];  
    let choosedIdArray = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
    let choosedFilmArray = JSON.parse(localStorage.getItem("choosedFilmArray")) || []; 
    let currentId = event.target.attributes.id.value;
    let currentFilm = loadedChildren.find(item => {return item.imdbID === currentId })  
  
    if (choosedIdArray.includes(currentId)){
      this.choosedFilms = this.choosedFilms.filter(item => item.imdbID !== currentId );
      choosedFilmArray = choosedFilmArray.filter(item =>  item.imdbID!== currentId );
    }else{
      this.choosedFilms.push(currentFilm);  
      choosedFilmArray.push(currentFilm);
    }


    if (choosedIdArray.includes(currentId)){
      this.ids = this.ids.filter(item => item !== currentId );
      choosedIdArray = choosedIdArray.filter(item => item !== currentId )
    }else{
      this.ids.push(currentId);     
      choosedIdArray.push(currentId);
    }


    localStorage.setItem("choosedIdArray", JSON.stringify(choosedIdArray));
    localStorage.setItem("choosedFilmArray", JSON.stringify(choosedFilmArray));
    console.log('ID:', currentId )

  }
  // end handlers ---------

  private makePrevNextToRequest(isGoToHandler:boolean){
    // check whatever this is "isGoToHandler" clicked
    let page = isGoToHandler ? this.inputPage.nativeElement.value : this.pagination.currentPageNmb;
    let searchRequest = this.searchControl.value || localStorage.getItem("searchRequest");


    this.httpService.filmAutocomplete(searchRequest, page)
    .pipe(
      tap(()=>{localStorage.setItem("loadedChildren", "[]")}),
      tap((r ) => {
        let item = r["Search"];
        console.log(item);
          item.forEach(element => {
          this.searchOneChildren(element.imdbID);
        })
      })
    )
    .subscribe(
      res => {
        console.log('Server responce: ', res);
        this.responce = {result:res};         // get avay
        this.pagination.totalResult = res["totalResults"];
        this.pagination.pagesAmount = Math.ceil(res["totalResults"]/10);
        localStorage.setItem('pagination', JSON.stringify(this.pagination ));
      },
      err => {
        console.log('ERROR!: ', err);
        this.responce = {error:err.message}
      });
  }

  public searchOneChildren(id){
    return this.httpService.getFilmById(id)
    .subscribe(
      res => {
        console.log('Server responce: ', res);
        let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren"));
        loadedChildren.push(res.body);
        localStorage.setItem("loadedChildren", JSON.stringify(loadedChildren));
         
        this.filsToObs(loadedChildren);
        localStorage.setItem("initialReload", "true");

      },
      err => {
        console.log('ERROR!: ', err);
        this.responce = {error:err.message}
      });
  }

}
