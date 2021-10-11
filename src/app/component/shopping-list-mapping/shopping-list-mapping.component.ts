import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListProductNg } from 'src/app/model/ShoppingListProductNg';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

@Component({
  selector: 'app-shopping-list-mapping',
  templateUrl: './shopping-list-mapping.component.html',
  styleUrls: ['./shopping-list-mapping.component.scss']
})
export class ShoppingListMappingComponent implements OnInit {

  @Input() mapping: ShoppingListProductNg = {amount:0,productTitle:'',unit:'',productId:'',id:'',shoppingListId:'',active:true};
  onLoad = false;

  constructor(public productService:ProductNgService,
    public shoppingListService:ShoppingListNgService) { }

  ngOnInit(): void {
  }

  onSave(values:any){
    console.log('onSave');
    console.log(values);

    const bIsNew = this.isNew()
    this.mapping.amount = values.amount;
    this.mapping.unit = values.unit;
    this.mapping.productId = values.product;
    this.onLoad = true;
    if(bIsNew){
      console.log('isNew');
      this.shoppingListService.addShoppingListMapping(this.mapping).subscribe((newMapping:ShoppingListProductNg) => {
        this.mapping = newMapping;
        this.onLoad = false;
      })
    } else {
      console.log('notNew');
      this.shoppingListService.updateShoppingListMapping(this.mapping).subscribe(() => {
        this.onLoad = false;
      });
      
    }
  }
  isNew(){
    console.log(this.mapping);
    //return this.mapping.unit.length > 0 && this.mapping.amount > 0 && this.mapping.productId.length > 0;
    return this.mapping.id.length <= 0;
  }
}
