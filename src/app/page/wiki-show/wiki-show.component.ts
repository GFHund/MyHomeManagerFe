import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiPageNg } from 'src/app/model/WikiPageNg';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';


@Component({
  selector: 'app-wiki-show',
  templateUrl: './wiki-show.component.html',
  styleUrls: ['./wiki-show.component.scss']
})
export class WikiShowComponent implements OnInit {

  wikiPage: WikiPageNg = {id:'',title:'',text:''};

  constructor(private route:ActivatedRoute,public wikiService: WikiNgService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.wikiService.getWikiPage(params['id']).subscribe(wiki =>{
        this.wikiPage = wiki;
      });
    })
  }

}
