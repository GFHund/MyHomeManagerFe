import { Component, OnInit } from '@angular/core';
import { MagazinesNg } from 'src/app/model/MagazinesNg';
import { MagazinesNgService } from 'src/app/service/magazinesNg/magazines-ng.service';

@Component({
  selector: 'app-magazine-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss']
})
export class MagazineListComponent implements OnInit {

  magazines:MagazinesNg[] = [];

  constructor(private magazineService:MagazinesNgService) { }

  ngOnInit(): void {
    this.magazineService.getMagazines().subscribe((magazines) => {
      this.magazines = magazines;
    });
  }

}
