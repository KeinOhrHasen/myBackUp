import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { SelectorService } from 'src/app/shared/services/selector/selector.service';
import { SuggestionService } from 'src/app/shared/services/suggestion/suggestion.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  @Input() filmArray$
  public obsSuggestedID$;
  public selectHandler = this.selector.selectHandler
  public SelectedIDs$ =  this.selector.getSelectedIds()
  public SelectedFilms$ = this.selector.getSelectedFilms()
  
  constructor(
    public suggest:SuggestionService,
    public router:Router,
    public selector: SelectorService) { }

  handleClickFromRouter(id){
    // this.suggest.addNew(id); 
    this.obsSuggestedID$ = this.suggest.getSuggested()
  }

  ngOnInit() {
    this.obsSuggestedID$ = this.suggest.getSuggested()
  }
  
}
