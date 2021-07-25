import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AppModes } from 'src/app/model/AppSettings';
import { WikiPageNg } from 'src/app/model/WikiPageNg';
import { WikiPageGet, WikiPageWrite, WikiService } from 'src/OpenApi';
import { AppSettingsService } from '../appSettings/app-settings.service';
import { LocalStorageService } from '../localStorage/local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class WikiNgService {

  constructor(private wikiService: WikiService, private appSetting:AppSettingsService,private localStorage:LocalStorageService) { 
    wikiService.configuration.basePath = 'http://127.0.0.1:8080';
  }

  getWikiPages():Observable<WikiPageNg[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode:AppModes) => {
      if(mode == AppModes.DEMO){
        return new Observable<WikiPageNg[]>((subscriber) => {
          setTimeout(() => {
            subscriber.next(this.getMockupDataList());
          },1000);
        });
      } else if(mode == AppModes.OFFLINE) {
        return new Observable<WikiPageNg[]>((subscriber) => {
          let sObj = this.localStorage.get('wikiPageList').subscribe((sObj) => {
            let oObj = JSON.parse(sObj);
            let ret:WikiPageNg[] = oObj.obj as WikiPageNg[];
            subscriber.next(ret);
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        return this.wikiService.getWikiPages().pipe(map(
          (retrivedWikiPage:WikiPageGet[]) => {
            let ret: WikiPageNg[] = [];
            for(let i in retrivedWikiPage){
              if(!retrivedWikiPage.hasOwnProperty(i)) continue;
              ret.push(
                {
                  id:retrivedWikiPage[i].id ?? '',
                  title:retrivedWikiPage[i].title ?? '',
                  text: retrivedWikiPage[i].text ?? ''
                }
              );
            }
            return ret;
          }
        ),tap((wikiPage:WikiPageNg[])=>{
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:wikiPage};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('wikiPageList',sCacheObj);
        }));
      }
    }));
  }
  getWikiPage(id:string):Observable<WikiPageNg>{
    let demoData = this.appSetting.getDemoData();
    let offlineData = this.appSetting.getOfflineData();
    return this.appSetting.getMode().pipe(mergeMap((mode:AppModes) => {
      if(mode == AppModes.DEMO){
        return new Observable<WikiPageNg>((subscriber) => {
          setTimeout(()=>{
            subscriber.next(this.getMockupDataSingle(id));
          },1000);
        });
      } else if (mode == AppModes.OFFLINE) {
        return new Observable<WikiPageNg>((subscriber) => {
          this.localStorage.get('wikiPage'+id).subscribe((sObj) => {
            let oObj = JSON.parse(sObj);
            let ret:WikiPageNg = oObj.obj as WikiPageNg;
            subscriber.next(ret);
          },(error) => {
            subscriber.error('offline Data not found');
          });
        });
      } else {
        return this.wikiService.getWikiPage(id).pipe(map(
          (retrivedWikiPage:WikiPageGet) => {
            return {
              id:retrivedWikiPage.id ?? '',
              title:retrivedWikiPage.title ?? '',
              text: retrivedWikiPage.text ?? ''
            } as WikiPageNg
          }
        ),tap((wikiPage:WikiPageNg)=>{
          let cacheObj = {time:((new Date()).getTime() / 1000),obj:wikiPage};
          let sCacheObj = JSON.stringify(cacheObj);
          this.localStorage.set('wikiPage'+id,sCacheObj);
        }));
      }
    }));
  }

  createWikiPage(newWikiPage:WikiPageNg):Observable<WikiPageNg>{
    return this.appSetting.getMode().pipe(mergeMap((mode)=>{
      if(mode == AppModes.DEMO){
        return new Observable<WikiPageNg>((subscriber) => {
          setTimeout(() => {
            subscriber.next(this.getMockupDataSingle('wikiPage1'));
          },1000);
        });
      } else if(mode == AppModes.OFFLINE) {
        return new Observable<WikiPageNg>((subscriber) => {
          subscriber.error('App is in offline mode');
        });
      } else {
        let write: WikiPageWrite = {
          text: newWikiPage.text,
          title: newWikiPage.title
        };
        return this.wikiService.createWikiPage(write).pipe(map((value:WikiPageGet) => {
          return {
            id:value.id ?? '',
            text: value.text ?? '',
            title: value.title ?? ''
          } as WikiPageNg;
        }));
      }  
    }));
    
  }

  updateWikiPage(updateWikiPage:WikiPageNg){
    return this.appSetting.getMode().pipe(mergeMap((mode)=>{
      if(mode == AppModes.DEMO) {
        return new Observable<WikiPageNg>((subscriber) => {
          setTimeout(() => {
            subscriber.next(updateWikiPage);
          },1000);
        });
      } else if(mode == AppModes.OFFLINE) {
        return new Observable<WikiPageNg>((subscriber) => {
          subscriber.error('App is in offline mode');
        });
      } else {
        let wikiWrite: WikiPageWrite = {
          title: updateWikiPage.title,
          text: updateWikiPage.text
        }
        return this.wikiService.updateWikiPage(updateWikiPage.id,wikiWrite).pipe(map((response => {
          return {
            id: response.id ?? '',
            title: response.title ?? '',
            text: response.text ?? ''
          } as WikiPageNg;
        })));
      }
    }));
  }

  getMockupDataList(){
    return [
      {id:'wikiPage1',title:'Dummy 1',text:'Dies ist eine Dummy Test seite'},
      {id:'wikiPage2',title:'Dummy 2',text:'Dies ist eine Dummy Test seite'},
    ]as WikiPageNg[];
  }
  getMockupDataSingle(id:string){
    let list = this.getMockupDataList();
    let singleElementList = list.filter((value)=>{return value.id === id});
    return singleElementList[0];
  }
}
