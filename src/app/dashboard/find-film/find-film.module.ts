import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindFilmRoutingModule } from './find-film-routing.module';
import { FindFilmComponent } from './find-film.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ShowListComponent } from './show-list/show-list.component';

@NgModule({
  declarations: [
    FindFilmComponent,
    FilmDetailComponent, 
    PaginationComponent,
    ShowListComponent,

  ],
  imports: [
    CommonModule,
    FindFilmRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ]
})
export class FindFilmModule { }
