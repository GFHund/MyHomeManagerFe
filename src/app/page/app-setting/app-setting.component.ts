import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppModes, AppSettings } from 'src/app/model/AppSettings';
import { AppSettingsService } from 'src/app/service/appSettings/app-settings.service';
import { LocalStorageService } from 'src/app/service/localStorage/local-storage.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {

  appSettings: AppSettings = {
    mode:AppModes.LIVE
  };

  constructor(private localStorage:LocalStorageService,private toastService:ToastService,private appSettingsService:AppSettingsService) { }

  ngOnInit(): void {
    this.appSettingsService.getMode().subscribe((value) => {
      if(value === null){
        this.appSettings.mode = AppModes.LIVE;
      } else {
        this.appSettings.mode = value;
      }

    })
  }

  onSubmit(form:NgForm){
    let values = form.value;
    console.log(values);
    for(let i in values){
      if(!values.hasOwnProperty(i))continue;
      this.localStorage.set(i,values[i]);
      this.toastService.createToast('Saved');
    }
  }
}
