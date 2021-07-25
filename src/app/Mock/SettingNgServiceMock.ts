import { Observable } from "rxjs";
import { SettingGroup } from "../model/SettingGroup";


export class SettingNgServiceMock{
    getSettings(){
        return new Observable<SettingGroup[]>(subscriber => {
            subscriber.next([
                {
                    title:'test',
                    settings: [
                        {
                            id:'abc123',
                            label:'test123',
                            technicalName:'tech',
                            type:'ints',
                            value:123,
                            valueId:'asd'
                        }
                    ]
                }
            ] as SettingGroup[]);
        });
    }
    updateSettings(settings:any){
        
    }
}