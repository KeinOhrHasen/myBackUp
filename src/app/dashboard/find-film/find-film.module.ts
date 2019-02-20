import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { FindFilmRoutingModule } from './find-film-routing.module';

// Components
import { FindFilmComponent } from './find-film.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { ShowListComponent } from './show-list/show-list.component';

// Angular  MAterial Modules
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatCardModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { BackBarModule } from '../components/back-bar/back-bar.module';


@NgModule({
  declarations: [
    FindFilmComponent,
    FilmDetailComponent, 
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
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

    BackBarModule,
  ]
})
export class FindFilmModule { }
