import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent implements OnInit {

  @Input() path?: string | Array<string|undefined>;

  constructor() { }

  ngOnInit(): void {
  }
	
}
