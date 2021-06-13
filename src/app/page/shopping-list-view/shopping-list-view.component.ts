import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListProductNg } from 'src/app/model/ShoppingListProductNg';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';
import { ShoppingListGet } from 'src/OpenApi';

@Component({
  selector: 'app-shopping-list-view-component',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.scss']
})
export class ShoppingListViewComponent implements OnInit {

	id = '';
	obj: ShoppingListGet = {id: '', title: ''};
	mappings: ShoppingListProductNg[] = [];
  constructor(public shoppingListService: ShoppingListNgService,public route: ActivatedRoute) { }

  ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.id = params.id;
		  this.shoppingListService.get(this.id).subscribe((shoppingList: ShoppingListGet) => {
		    this.obj = shoppingList;
		  });
			this.shoppingListService.getShoppingListItems(this.id)
		  .subscribe((mappings: ShoppingListProductNg[]) => {
		    this.mappings = mappings;
		    console.log(mappings);
		  });			
		});
  }

}
