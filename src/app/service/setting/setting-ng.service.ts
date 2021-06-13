import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SettingGroup } from 'src/app/model/SettingGroup';
import { SettingGet } from 'src/app/model/SettingGet';
import { Setting } from 'src/app/model/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingNgService {

  constructor(protected httpClient: HttpClient) { }

  getSettings(){
    return this.httpClient.get<SettingGet[]>('http://localhost:8080/api/v1/setting').pipe(map((settings:SettingGet[]) =>{
      let ret:SettingGroup[] = [];
    
      for(let i in settings){
        if(!settings.hasOwnProperty(i))continue;
        let bFound = false;
        for(let k in ret){
          if(!ret.hasOwnProperty(k)) continue;
          if(ret[k].title === settings[i].groupName){
            bFound = true;
            ret[k].settings.push({
              id: settings[i].id,
              label: settings[i].label,
              technicalName: settings[i].technicalName,
              type: settings[i].type,
              value: settings[i].value,
              valueId: settings[i].valueId
            }as Setting);
            break;
          }
        }
        if(bFound === false){
          ret.push({
            title: settings[i].groupName,
            settings: [
              {
                id: settings[i].id,
                label: settings[i].label,
                technicalName: settings[i].technicalName,
                type: settings[i].type,
                value: settings[i].value,
                valueId: settings[i].valueId
              } as Setting
            ]
          } as SettingGroup);
        }
      }
      
      return ret;
    }));
  }

  updateSettings(settings:any){
    return this.httpClient.put('http://localhost:8080/api/v1/setting',settings);
  }
}
