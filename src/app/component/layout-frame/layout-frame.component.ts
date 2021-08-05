import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { AppModes, AppSettings } from 'src/app/model/AppSettings';
import { AppSettingsService } from 'src/app/service/appSettings/app-settings.service';

@Component({
  selector: 'layout-frame',
  templateUrl: './layout-frame.component.html',
  styleUrls: ['./layout-frame.component.scss']
})
export class LayoutFrameComponent implements OnInit {

  @Input() returnPath?: string | Array<string|undefined>;
  @ViewChild('navigation') navigation?: ElementRef;
  navClass = false;
  appMode = '';

  constructor(private appSettings: AppSettingsService) { }

  ngOnInit(): void {
    this.appSettings.getMode().subscribe((value) => {
      if(value == AppModes.DEMO){
        this.appMode = 'Demo';
      } else if(value == AppModes.OFFLINE){
        this.appMode = 'Offline';
      } else if(value == AppModes.LIVE){
        this.appMode = 'Live';
      } else {
        this.appMode = 'Unknown';
      }
    },error=>{
      console.log(error);
    })
  }

	openMenuButton(){
		//this.navigation.nativeElement.classList.toggle('nav-open');
		this.navClass = !this.navClass;
	}
}
