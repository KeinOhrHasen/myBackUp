import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  public suggestedIdStore$: BehaviorSubject<string[]> = new BehaviorSubject([])


  // generate array of suggested films based on choosed film Genres
  // return bahavior Subject of suggested id array
  public getSuggested(): Observable<string[]>{

    // get choosed ID and loaded films from LocalStorage
    let currentId = JSON.parse(localStorage.getItem("currentId"));
    let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren"));

    // find current film via ID in loaded films
    let currentFilm = loadedChildren.find((film)=>{
      return film.imdbID === currentId;
    });

    // if currentFilm not found return null
    if (!currentFilm) { return null }

    // clear "suggestedIdStore$"
    let currentGenres = currentFilm.Genre.split(",");
    this.suggestedIdStore$.next([])                         

    // find all films that had at least one similar Genre
    // with current genres and save them to suggestedIdStore$
    loadedChildren.forEach(filmItem => {
      filmItem.Genre.split(",").forEach(genreItem => {

        let nextId = this.suggestedIdStore$.value;
        if (currentGenres.includes(genreItem) && 
          (nextId.indexOf(filmItem.imdbID)=== -1) &&
          filmItem.imdbID !== currentId){
          nextId.push(filmItem.imdbID);
          this.suggestedIdStore$.next(nextId);
          }
      });
    });

    return this.suggestedIdStore$;
  }


  addNew(id:string) {  
    let prev = this.suggestedIdStore$.value;
    prev.push(id)
    this.suggestedIdStore$.next(prev);
  }

  constructor(
  ) { }
}
