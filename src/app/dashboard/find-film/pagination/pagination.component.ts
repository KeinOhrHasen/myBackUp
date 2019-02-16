import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  @Input() pagination
  @Input() handlePrev
  @Input() handleGoTo
  @Input() handleNext
  @Input() responce

  ngOnInit() {
  }

}
