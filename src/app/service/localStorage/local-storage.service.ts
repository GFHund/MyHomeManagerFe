import { Injectable } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import { Storage } from '@capacitor/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key:string,value:string){
    if(Capacitor.isNativePlatform()){
      Storage.set({key: key, value:value}).then(() => {});
    } else {
      if(window.localStorage){
        window.localStorage.setItem(key,value);
      }
    }
    
  }

  get(key:string): Observable<string>{
    if(Capacitor.isNativePlatform()){
      return new Observable<string>((subscriber) => {
        Storage.get({key:key}).then((value) => {
          subscriber.next(value.value??'');
        }).catch((reason) => {
          subscriber.error(reason);
        });
      })
    } else {
      if(window.localStorage){
        return new Observable<string>((subscriber) => {
          let value = window.localStorage.getItem(key);
          if(value){
            subscriber.next(value)
          } else {
            subscriber.error('key Not Found');
          }
          
        })
        
      } else {
        return new Observable<string>((subscriber) => {
          Storage.get({key:key}).then((value) => {
            subscriber.next(value.value??'');
          }).catch((reason) => {
            subscriber.error(reason);
          });
        });
      }
    }
  }

  getBoolean(key:string):Observable<boolean>{
    return this.get(key).pipe(map((value) => {
      return key === 'true';
    }));
  }

  getNumber(key:string):Observable<number>{
    return this.get(key).pipe(map((value)=> {
      let iValue = parseInt(value);
      if(isNaN(iValue)){
        throw new Error('value is not a number');
      }else {
        return iValue;
      }
    }));
  }
}
