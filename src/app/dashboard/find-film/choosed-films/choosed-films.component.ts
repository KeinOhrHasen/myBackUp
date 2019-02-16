import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choosed-films',
  templateUrl: './choosed-films.component.html',
  styleUrls: ['./choosed-films.component.css']
})
export class ChoosedFilmsComponent implements OnInit {

  ids= JSON.parse(localStorage.getItem("choosedIdArray")) || [];
  choosedFilms = JSON.parse(localStorage.getItem("choosedFilmArray")) || [];


  selectHandler(event){
    let confirmDelete = confirm("Do you realy wand delete this film from choosed ?");

    if (confirmDelete){
      let choosedIdArray = JSON.parse(localStorage.getItem("choosedIdArray")) || [];
      let choosedFilmArray = JSON.parse(localStorage.getItem("choosedFilmArray")) || []; 
      let currentId = event.target.attributes.id.value;

      this.ids = this.ids.filter(item => item !== currentId );
      choosedIdArray = choosedIdArray.filter(item => item !== currentId );
      this.choosedFilms = this.choosedFilms.filter(item => item.imdbID !== currentId );
      choosedFilmArray = choosedFilmArray.filter(item =>  item.imdbID!== currentId );
      
      localStorage.setItem("choosedFilmArray", JSON.stringify(choosedFilmArray));
      localStorage.setItem("choosedIdArray", JSON.stringify(choosedIdArray));
    }
  }
  ngOnInit() {
  }
}
