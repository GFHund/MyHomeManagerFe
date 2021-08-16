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

  constructor(private productService:ProductNgService) { }

  ngOnInit(): void {
		this.productService.getList().subscribe((articles:ProductNg[]) => {
      this.bLoading = false;
			this.products = articles;
		});
  }

}
