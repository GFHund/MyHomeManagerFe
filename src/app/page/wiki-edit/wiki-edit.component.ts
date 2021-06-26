import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiPageNg } from 'src/app/model/WikiPageNg';
import { ToastService } from 'src/app/service/toast/toast.service';
import { WikiNgService } from 'src/app/service/wikiNg/wiki-ng.service';

@Component({
  selector: 'app-wiki-edit',
  templateUrl: './wiki-edit.component.html',
  styleUrls: ['./wiki-edit.component.scss']
})
export class WikiEditComponent implements OnInit {

  wikiObj:WikiPageNg = {id:'',text:'',title:''};
  bNew: boolean = false;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public wikiService: WikiNgService,
    private toastService:ToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.hasOwnProperty('id')){
        this.bNew = false;
        this.wikiService.getWikiPage(params['id']).subscribe(wikiPage => {
          this.wikiObj = wikiPage;
        });
      } else {
        this.bNew = true;
      }
    })
  }
  onSubmit(form:NgForm){
    let values = form.value;
    
    this.wikiObj.text = values.content;
    this.wikiObj.title = values.title;
    if(this.bNew){
      
      this.wikiService.createWikiPage(this.wikiObj).subscribe(wikiPage => {
        this.toastService.createToast('Save Successful').then(()=>{
          this.router.navigate(['/wiki',wikiPage.id,'edit']);
        });
        
      })
    } else {
      this.wikiService.updateWikiPage(this.wikiObj).subscribe(wikiPage => {
        this.wikiObj = wikiPage;
        this.toastService.createToast('Save Successful').then(()=>{});
      });
    }
  }

}
