import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SettingGroup } from 'src/app/model/SettingGroup';
import { SettingGet } from 'src/app/model/SettingGet';
import { Setting } from 'src/app/model/Setting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingNgService {

  constructor(protected httpClient: HttpClient) { }

  getSettings(){
    let serverUrl = environment.serverUrl
    return this.httpClient.get<SettingGet[]>(serverUrl + '/api/v1/setting').pipe(map((settings:SettingGet[]) =>{
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
    let serverUrl = environment.serverUrl
    return this.httpClient.put(serverUrl + '/api/v1/setting',settings);
  }
}
