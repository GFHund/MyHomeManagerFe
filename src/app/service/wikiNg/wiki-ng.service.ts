import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WikiPageNg } from 'src/app/model/WikiPageNg';
import { WikiPageGet, WikiPageWrite, WikiService } from 'src/OpenApi';



@Injectable({
  providedIn: 'root'
})
export class WikiNgService {

  constructor(private wikiService: WikiService) { 
    wikiService.configuration.basePath = 'http://127.0.0.1:8080';
  }

  getWikiPages(){
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
    ));
  }
  getWikiPage(id:string){
    return this.wikiService.getWikiPage(id).pipe(map(
      (retrivedWikiPage:WikiPageGet) => {
        return {
          id:retrivedWikiPage.id ?? '',
          title:retrivedWikiPage.title ?? '',
          text: retrivedWikiPage.text ?? ''
        } as WikiPageNg
      }
    ));
  }

  createWikiPage(newWikiPage:WikiPageNg){
    let write: WikiPageWrite = {
      text: newWikiPage.text,
      title: newWikiPage.title
    };
    return this.wikiService.createWikiPage(write);
  }
}
