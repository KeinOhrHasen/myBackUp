import { Component, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/shared/services/selector/selector.service';

@Component({
  selector: 'app-choosed-films',
  templateUrl: './choosed-films.component.html',
  styleUrls: ['./choosed-films.component.css']
})
export class ChoosedFilmsComponent implements OnInit {

  constructor(
    public selector: SelectorService) { }

  public deleteHandler = this.selector.deleteHandler
  public SelectedIDs$ = this.selector.getSelectedIds()
  public SelectedFilms$ = this.selector.getSelectedFilms()

  ngOnInit() { }
}
