import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Film } from '../../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  FILMS = JSON.parse(localStorage.getItem("loadedChildren"));
    
  
  public getAllFilms(): Observable<Film[]> {
    console.log("films from service", this.FILMS)
    return of(this.FILMS);
  }


  // film service component dont know about changes in local storage
  // film service contain previous film array
  // so we shoud reload page once
  public refresh(): void {
    if (JSON.parse(localStorage.getItem("initialReload"))) {
      localStorage.setItem("initialReload", "false")
      window.location.reload();
    }
  }


  public  getFilm(imdbID: string) {
    return this.getAllFilms().pipe(
      map((allFilms: Film[]) => allFilms.find(film => film.imdbID === imdbID))
    );
  }
}