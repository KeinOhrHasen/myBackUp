import { switchMap, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Film } from 'src/app/shared/models/film';
import { FilmService } from 'src/app/shared/services/film/film.service';
import { SelectorService } from 'src/app/shared/services/selector/selector.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  film$: Observable<Film>;
  public selectHandler = this.selector.selectHandler
  public SelectedIDs$ = this.selector.getSelectedIds()
  public SelectedFilms$ = this.selector.getSelectedFilms()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilmService,
    public selector:SelectorService
  ) {}

  ngOnInit() {
    // refresh page to get fresh data from Local Storage
    this.service.refresh()

    this.film$ = this.route.paramMap.pipe(
      // set current choosed film ID to Local Storage
      tap((params: ParamMap)=>{localStorage.setItem("currentId", JSON.stringify(params.get('imdbID')))}),
      switchMap((params: ParamMap) =>
        this.service.getFilm(params.get('imdbID')))
    );
  }
  

  gotoAllFilms(film: Film) {
    let filmId = film ? film.imdbID : null;
    // Pass along the film id if available
    // so that the ShowList component can select that hero.
    this.router.navigate(['/dashboard/find-film', { imdbID: filmId}]);
    localStorage.setItem("isDetail", "false")
  }

}
