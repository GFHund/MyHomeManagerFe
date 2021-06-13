import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'layout-frame',
  templateUrl: './layout-frame.component.html',
  styleUrls: ['./layout-frame.component.scss']
})
export class LayoutFrameComponent implements OnInit {

  @Input() returnPath?: string | Array<string|undefined>;
  @ViewChild('navigation') navigation?: ElementRef;
  navClass = false;

  constructor() { }

  ngOnInit(): void {
	
  }

	openMenuButton(){
		//this.navigation.nativeElement.classList.toggle('nav-open');
		this.navClass = !this.navClass;
	}
}
