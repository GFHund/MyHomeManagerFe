import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { }


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {

	@Input() icon?:string;
	@Input() width?:string;
	@Input() height?:string;
	@Input() viewbox?:string;
	@ViewChild('icon') iconElement?: ElementRef;
	iconSvg = '';

  constructor() {
	
 }

  ngOnInit(): void {
	
	/*
	this.http.get<string>('assets/icons/' + this.icon + '.svg',{responseType:'text' as 'json'}).subscribe(result => {
		//this.iconElement.innerHtml = result;
		if(this.iconElement){
			this.iconElement.nativeElement.innerHTML = result;			
		}
		
		//this.iconSvg = result;
		//console.log(result);
	});
	*/
  }

}
