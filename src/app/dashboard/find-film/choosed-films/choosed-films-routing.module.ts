import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChoosedFilmsComponent } from './choosed-films.component';

const routes: Routes = [
  {path:"", component: ChoosedFilmsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoosedFilmsRoutingModule { }
