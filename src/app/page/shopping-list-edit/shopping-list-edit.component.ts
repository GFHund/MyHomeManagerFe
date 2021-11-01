import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ShoppingListGet, ShoppingListMappingGet } from 'src/OpenApi';
import { ShoppingListProductNg } from 'src/app/model/ShoppingListProductNg';
import { ShoppingListNg } from 'src/app/model/ShoppingListNg';
import { SliderContainerComponent } from 'src/app/component/slider-container/slider-container.component';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { ProductNg } from 'src/app/model/ProductNg';

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
	@ViewChild(SliderContainerComponent) slider?:SliderContainerComponent;

  	constructor(public shoppingListService: ShoppingListNgService,
		public productService: ProductNgService,
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
		
	setTimeout(()=>{
		this.slider?.selectActiveSlide(this.mappings.length-1);
	},1000);
	
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

  onSaveMapping(mapping: ShoppingListProductNg,index:number){
	  //this.slider?.update();
	  console.log('onSaveMapping');
	  console.log(mapping);
	  this.productService.getProduct(mapping.productId).subscribe((product:ProductNg) => {
		//mapping.productTitle = product.productName;

		const lastIndex = this.mappings.length - 1;
		this.mappings[index].productTitle = product.productName;
	  })
	  this.slider?.update();
  }
}
