import { Component, OnInit } from '@angular/core';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import {ProductNg} from '../../model/ProductNg';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

	products: ProductNg[] = [];
  bLoading = true;
  sSearch:string = '';

  constructor(private productService:ProductNgService) { }

  ngOnInit(): void {
		this.loadList();
  }

  loadList(){
    this.bLoading = true;
    this.productService.getList().subscribe((articles:ProductNg[]) => {
      this.bLoading = false;
			this.products = articles;
		});
  }

  onChange(search:string){
    this.sSearch = search;

  }
  onDeleteProduct(id: string ){
    let index = this.products.findIndex((value,index,product) => {
      return value.id == id;
    });
    this.products.splice(index,1);
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadList();
    })
  }
}
