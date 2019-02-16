import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Film } from 'src/app/shared/models/film';
import { FilmService } from 'src/app/shared/services/film/film.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  film$: Observable<Film>;
  ids= JSON.parse(localStorage.getItem("choosedIdArray")) || [];
  choosedFilms = JSON.parse(localStorage.getItem("choosedFilmArray")) || [];
  loadedFilms = JSON.parse(localStorage.getItem("loadedChildren"));


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FilmService
  ) {}
  
  ngOnInit() {
    // refresh page to get fresh data from Local Storage
    this.service.refresh()
    // console.log('film from film-datail:' , this.filmArray)

    this.film$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getFilm(params.get('imdbID')))
    );
  }
  

  gotoAllFilms(film: Film) {
    let filmId = film ? film.imdbID : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/dashboard/find-film', { imdbID: filmId}]);
  }

  public selectHandler(event){
    

    let loadedChildren = JSON.parse(localStorage.getItem("loadedChildren")) || [];  
    let choosedIdArray = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
    let choosedFilmArray = JSON.parse(localStorage.getItem("choosedFilmArray")) || [];
    let currentId = event.target.attributes.id.value;
    let currentFilm = loadedChildren.find(item => {return item.imdbID === currentId }) 
    let filmGenre = currentFilm.Genre; //genre


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
    localStorage.setItem("currentGenres", JSON.stringify(filmGenre));  //genre

  }
}
