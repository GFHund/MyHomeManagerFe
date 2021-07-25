import { Observable } from "rxjs";
import { MagazinesNg } from "../model/MagazinesNg";

export class MagazinesNgServiceMock{
    getMagazines():Observable<MagazinesNg[]>{
        return new Observable<MagazinesNg[]>((subscriber) => {
            subscriber.next([
                {id: 'mag1',name:'Magazine 1',url:'/magazine1'},
                {id: 'mag2',name:'Magazine 2',url:'/magazine2'}
              ]);
        });
    }
}