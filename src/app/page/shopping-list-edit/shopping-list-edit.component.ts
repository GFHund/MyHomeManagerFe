import { Component, OnInit } from '@angular/core';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListGet, ShoppingListMappingGet } from 'src/OpenApi';
import { ShoppingListProductNg } from 'src/app/model/ShoppingListProductNg';
import { ShoppingListNg } from 'src/app/model/ShoppingListNg';

@Component({
  selector: 'app-shopping-list-edit-component',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {

	id = '';
	obj: ShoppingListNg = {id: '', title: ''};
	mappings: ShoppingListProductNg[] = [];
	isNew: boolean = false;
	onLoad = true;

  	constructor(public shoppingListService: ShoppingListNgService,
		public route: ActivatedRoute,
		public router: Router) { }

  	ngOnInit(): void {
		this.route.params.subscribe(params => {
				if(params.hasOwnProperty('id')){
				this.id = params.id;
				this.shoppingListService.get(this.id).subscribe((shoppingList: ShoppingListNg) => {
					this.obj = shoppingList;
				});
				this.shoppingListService.getShoppingListItems(this.id)
				.subscribe((mappings: ShoppingListProductNg[]) => {
					console.log(mappings);
					this.mappings = mappings;
					this.onLoad = false;
				});			
				} else {
					this.isNew = true;
					this.onLoad = false;
				}
		});
	}

  onAddProduct(value:any){
	  console.log('Product Added');
	  this.mappings.push({
		  amount:0,
		  productTitle:'bla',
		  unit:'',
		  productId:'',
		  id:'',
		  active:true,
		  shoppingListId:this.obj.id});
  }
  onSave(values:any){
	  console.log(values);
	  this.obj.title = values.title;
	  this.onLoad = true;
	  if(this.isNew){
		this.shoppingListService.addShoppingList(this.obj).subscribe((newShoppingList:ShoppingListNg) => {
			this.onLoad = false;
			this.router.navigate(['/shopping-list',newShoppingList.id,'edit'])
		});
	  }else{
		this.shoppingListService.updateShoppingList(this.obj).subscribe(()=>{
			this.onLoad = false;
		});
	  }
  }
}
