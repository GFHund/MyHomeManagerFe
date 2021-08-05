import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AppModes } from 'src/app/model/AppSettings';
import { MagazinesNg } from 'src/app/model/MagazinesNg';
import { MagazinesGet, MagazinesService } from 'src/OpenApi';
import { AppSettingsService } from '../appSettings/app-settings.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MagazinesNgService {

  constructor(private magazinesService: MagazinesService,
    private appSetting:AppSettingsService,
    private localStorage:LocalStorageService) { 
    magazinesService.configuration.basePath = 'http://127.0.0.1:8080';
  }

  getMagazines():Observable<MagazinesNg[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<MagazinesNg[]>((subscriber) => {
          setTimeout(()=> {
            subscriber.next([
              {id: 'mag1',name:'Magazine 1',url:'/magazine1'},
              {id: 'mag2',name:'Magazine 2',url:'/magazine2'}
            ]);
          },1000);
        });
      } else if(mode == AppModes.OFFLINE){
        return new Observable<MagazinesNg[]>((subscriber) => {
          let sObj = this.localStorage.get('products').subscribe((sObj) => {
            if(sObj === null){
              subscriber.next([]);
            } else {
              let oObj = JSON.parse(sObj);
              let ret:MagazinesNg[] = oObj.obj as MagazinesNg[];
              subscriber.next(ret);
            }
            
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        return this.magazinesService.getMagazineList().pipe(
          map((magazines:MagazinesGet[]) => {
            let ret: MagazinesNg[] = [];
            for(let i in magazines){
              if(!magazines.hasOwnProperty(i)) continue;
              ret.push({
                id: magazines[i].id??'',
                name: magazines[i].name??'',
                url:magazines[i].url??''
                
              });
            }
            return ret;
          }),
          tap((magazines) => {
            let cacheObj = {time:((new Date()).getTime() / 1000),obj:magazines};
            let sCacheObj = JSON.stringify(cacheObj);
            this.localStorage.set('magazines',sCacheObj);
          })
        );
      }
    }));
    
  }
}
