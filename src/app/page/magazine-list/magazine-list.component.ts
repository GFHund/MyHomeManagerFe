import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { MagazinesNg } from 'src/app/model/MagazinesNg';
import { MagazinesNgService } from 'src/app/service/magazinesNg/magazines-ng.service';

@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss']
})
export class MagazineListComponent implements OnInit {

  magazines:MagazinesNg[] = [];
  bLoading = true;

  constructor(private magazineService:MagazinesNgService) { }

  ngOnInit(): void {
    this.magazineService.getMagazines().subscribe((magazines) => {
      this.magazines = magazines;
      this.bLoading = false;
    });
  }

  onMagazineIndex(){
    this.bLoading = true;
    this.magazineService.indexMagazines().pipe(mergeMap(ret => {
      return this.magazineService.getMagazines();
    })).subscribe((magazines) => {
      this.magazines = magazines;
      this.bLoading = false;
    })
  }

}
