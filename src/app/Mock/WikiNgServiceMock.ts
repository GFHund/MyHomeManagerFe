import { Observable } from "rxjs";
import { WikiPageNg } from "../model/WikiPageNg";

export class WikiNgServiceMock{
    getWikiPages():Observable<WikiPageNg[]>{
        return new Observable<WikiPageNg[]>((subscriber) => {
            subscriber.next(this.getMockupDataList());
        });
    }
    getWikiPage(id:string):Observable<WikiPageNg>{
      return new Observable<WikiPageNg>((subscriber) => {
        subscriber.next(this.getMockupDataSingle(id));
      });
    }
    private getMockupDataList(){
      return [
        {id:'wikiPage1',title:'Dummy 1',text:'Dies ist eine Dummy Test seite'},
        {id:'wikiPage2',title:'Dummy 2',text:'Dies ist eine Dummy Test seite'},
      ]as WikiPageNg[];
    }
    private getMockupDataSingle(id:string){
      let list = this.getMockupDataList();
      let singleElementList = list.filter((value)=>{return value.id === id});
      return singleElementList[0];
    }
}