import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindFilmComponent } from './find-film.component';
import { FilmDetailComponent } from './film-detail/film-detail.component'


const routes: Routes = [
  {path: "", component: FindFilmComponent},
  {path: "film/:imdbID", component: FilmDetailComponent},
  {path: "choosed", loadChildren: './choosed-films/choosed-films.module#ChoosedFilmsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindFilmRoutingModule { }

// git remote set-url origin https://github.com/KeinOhrHasen/myBackUp