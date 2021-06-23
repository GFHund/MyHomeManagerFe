import { Component, OnInit } from '@angular/core';
import { WikiPageNg } from 'src/app/model/WikiPageNg';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';

@Component({
  selector: 'app-wiki-list',
  templateUrl: './wiki-list.component.html',
  styleUrls: ['./wiki-list.component.scss']
})
export class WikiListComponent implements OnInit {

  wikiPages:WikiPageNg[] = [];

  constructor(private wikiService:WikiNgService) { }

  ngOnInit(): void {
    this.wikiService.getWikiPages().subscribe((wikiPages:WikiPageNg[])=> {
      this.wikiPages = wikiPages;
    });
  }

  onDelete(id: string){}

}
