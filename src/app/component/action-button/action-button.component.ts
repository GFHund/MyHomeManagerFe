import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Output() onClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
	onClick(){
    this.onClickEvent.emit('button clicked');
  }
}
