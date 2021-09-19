import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

	@Input() label = '';
  labelClass = '';
  @Output() input = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public onChange(evt: Event) {
    let value = (<HTMLInputElement>evt.target).value;
    this.input.emit(value);
  }

}
