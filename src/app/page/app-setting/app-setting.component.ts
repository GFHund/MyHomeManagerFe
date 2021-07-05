import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppSettings } from 'src/app/model/AppSettings';
import { LocalStorageService } from 'src/app/service/localStorage/local-storage.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {

  appSettings: AppSettings = {
    demoData: false,
    offlineData: false
  };

  constructor(private localStorage:LocalStorageService,private toastService:ToastService) { }

  ngOnInit(): void {
    
    for(const i in this.appSettings){
      if(this.appSettings.hasOwnProperty(i)){
        
        let setting = this.appSettings[i as keyof AppSettings];
        let value = this.localStorage.get(i)
        if(value === null){
          this.localStorage.set(i,''+setting);
        } else {
          this.appSettings[i as keyof AppSettings] = value ==='true';
        }
      }
    }
    
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
