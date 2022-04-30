import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormSelectInterface, SelectOptions } from "src/app/interfaces/formSelectInterface";
import { ClosureDetail } from "src/app/model/traffic/ClosureDetail";
import { ClosureList } from "src/app/model/traffic/ClosureList";
import { RoadList } from "src/app/model/traffic/RoadList";
import { WarningDetail } from "src/app/model/traffic/WarningDetail";
import { WarningList } from "src/app/model/traffic/WarningList";

@Injectable({
    providedIn: 'root'
})
export class TrafficService implements FormSelectInterface{
    constructor(public httpClient: HttpClient ){}
    getSelectOptions(search: string): Observable<SelectOptions[]> {
        return this.getAutobahnList().pipe(map((response) => {
            let filtertedAutobahn = response.roads.filter(autobahn => autobahn.includes(search));
            let ret: SelectOptions[] = [];
            for(let i in filtertedAutobahn){
                if(!filtertedAutobahn.hasOwnProperty(i)) continue;
                ret.push({id:filtertedAutobahn[i],text:filtertedAutobahn[i]});
            }
            return ret;
        }));
    }
    getLabelFromId(id: string): Observable<string> {
        return new Observable((subscriber) => {
            subscriber.next(id);
        });
    }

    getAutobahnList():Observable<RoadList>{
        return this.httpClient.get<RoadList>('https://verkehr.autobahn.de/o/autobahn');
    }

    getTrafficWarningList(roadId: string){
        return this.httpClient.get<WarningList>('https://verkehr.autobahn.de/o/autobahn/'+roadId+'/services/warning');
    }
    getTrafficWarningDetail(warningId: string){
        return this.httpClient.get<WarningDetail>('https://verkehr.autobahn.de/o/autobahn/details/warning/'+warningId);
    }
    getTrafficClosureList(roadId: string){
        return this.httpClient.get<ClosureList>('https://verkehr.autobahn.de/o/autobahn/'+roadId+'/services/closure');
    }
    getTrafficClosureDetail(closureId: string){
        return this.httpClient.get<ClosureDetail>('https://verkehr.autobahn.de/o/autobahn/details/closure/'+closureId);
    }

    
}