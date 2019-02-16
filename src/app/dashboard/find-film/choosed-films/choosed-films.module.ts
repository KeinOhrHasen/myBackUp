import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoosedFilmsRoutingModule } from './choosed-films-routing.module';
import { ChoosedFilmsComponent } from './choosed-films.component';

@NgModule({
  declarations: [ChoosedFilmsComponent],
  imports: [
    CommonModule,
    ChoosedFilmsRoutingModule
  ]
})
export class ChoosedFilmsModule { }
