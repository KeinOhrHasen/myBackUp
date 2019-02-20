import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {


  choosedFilms = JSON.parse(localStorage.getItem("choosedFilmArray")) || [];
  ids = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
  
  SelectedFilms$ = new BehaviorSubject(this.choosedFilms);
  SelectedIDs$ = new BehaviorSubject(this.ids);

  getSelectedIds(){ return this.SelectedIDs$ }

  getSelectedFilms(){ return this.SelectedFilms$ }


  // handle select buttons
  public selectHandler(event){
   
    let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren")) || [];  
    let choosedIdArray = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
    let choosedFilmArray = JSON.parse(localStorage.getItem("choosedFilmArray")) || []; 
    let currentId = event.target.attributes.id.value;
    let currentFilm = loadedChildren.find(item => {return item.imdbID === currentId })
    
    // tougle film in "choosedFilmArray"
    // We need "choosedFilmArray" to manage choosed films in "ChoosedFilmComponent" interactive
    if (choosedIdArray.includes(currentId)){
      this.SelectedFilms$.next(this.SelectedFilms$.value.filter(film => film.imdbID !== currentId ))  ;
      choosedFilmArray = choosedFilmArray.filter(film =>  film.imdbID!== currentId );
    }else{
      this.SelectedFilms$.next(this.SelectedFilms$.value.concat([currentFilm]));  
      choosedFilmArray.push(currentFilm);
    }

    // tougle film id in "choosedIdArray"
    // We need "choosedIdArray" that easyly check do same film is choosed
    if (choosedIdArray.includes(currentId)){
      this.SelectedIDs$.next(this.SelectedIDs$.value.filter(id => id !== currentId ));
      choosedIdArray = choosedIdArray.filter(id => id !== currentId )
    }else{
      this.SelectedIDs$.next(this.SelectedIDs$.value.concat([currentId]));  
      choosedIdArray.push(currentId);
    }

    // save all changes to "localStorage" and make them available after page reload
    localStorage.setItem("choosedIdArray", JSON.stringify(choosedIdArray));
    localStorage.setItem("choosedFilmArray", JSON.stringify(choosedFilmArray));
  }

  
  deleteHandler(event){
    // ask user confilm for item deleting
    let confirmDelete = confirm("Do you realy wand delete this film from choosed ?");

    if (confirmDelete){
      let choosedIdArray = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
      let choosedFilmArray = JSON.parse(localStorage.getItem("choosedFilmArray")) || []; 
      let currentId = event.target.attributes.id.value;

      this.SelectedIDs$.next(this.SelectedIDs$.value.filter(item => item !== currentId ));
      choosedIdArray = choosedIdArray.filter(item => item !== currentId );
      this.SelectedFilms$.next(this.SelectedFilms$.value.filter(item => item.imdbID !== currentId ));
      choosedFilmArray = choosedFilmArray.filter(item =>  item.imdbID!== currentId );
      
      localStorage.setItem("choosedFilmArray", JSON.stringify(choosedFilmArray));
      localStorage.setItem("choosedIdArray", JSON.stringify(choosedIdArray));
    }
  }
}
