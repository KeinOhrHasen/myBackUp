import { Injectable } from '@angular/core';
import { OmdbApiService } from '../omdb/omdb-api.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  genreString = localStorage.getItem("choosedIdArray");


  constructor(
    private omdbApi: OmdbApiService
  ) { }
}
