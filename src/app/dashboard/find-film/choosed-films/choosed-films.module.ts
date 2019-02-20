import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoosedFilmsRoutingModule } from './choosed-films-routing.module';
import { ChoosedFilmsComponent } from './choosed-films.component';
import { MatIconModule, MatMenuModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { BackBarModule } from '../../components/back-bar/back-bar.module';

@NgModule({
  declarations: [ChoosedFilmsComponent],
  imports: [
    CommonModule,
    ChoosedFilmsRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    
    BackBarModule,
  ]
})
export class ChoosedFilmsModule { }
