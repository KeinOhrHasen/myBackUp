import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  @Input() filmArray$
  // @Input() selectedId
  @Input() selectHandler
  @Input() ids

  // @Output()
  // uploaded = new EventEmitter();

  // uploadComplete() {
  //   this.uploaded.emit('complete');
  // }

  constructor() { }

  ngOnInit() {
    // this.selectedId = this.selectedId || undefined
  }

}
