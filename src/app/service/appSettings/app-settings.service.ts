import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModes } from 'src/app/model/AppSettings';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor(private localStorage:LocalStorageService) { }

  getOfflineData():Observable<boolean>{
    return this.localStorage.get('offlineData').pipe(map((offlineData) => {
      return offlineData ==='true';
    })); 
  }

  getDemoData():Observable<boolean|null>{
    return this.localStorage.getBoolean('demoData');
  }

  getMode():Observable<AppModes|null>{
    return this.localStorage.getNumber('mode');
  }
}
