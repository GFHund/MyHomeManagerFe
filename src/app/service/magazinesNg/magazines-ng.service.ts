import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MagazinesNg } from 'src/app/model/MagazinesNg';
import { MagazinesGet, MagazinesService } from 'src/OpenApi';

@Injectable({
  providedIn: 'root'
})
export class MagazinesNgService {

  constructor(private magazinesService: MagazinesService) { 
    magazinesService.configuration.basePath = 'http://127.0.0.1:8080';
  }

  getMagazines(){
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
      })
    );
  }
}
