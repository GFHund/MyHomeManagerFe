import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductNg } from 'src/app/model/ProductNg';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

	product: ProductNg = {id:'',productName:''};
	isNew: boolean = false;
	@ViewChild('form') form?:NgForm = undefined;

  constructor(private productService:ProductNgService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
		this.route.params.subscribe(params => {
			if(params.hasOwnProperty('id')){
				this.productService.getProduct(params['id']).subscribe((product:ProductNg) => {
					this.product = product;
				});
			}else {
				this.isNew = true;
			}
		});
  }

	onSave(form:NgForm){
		if(!form.valid){
			console.log('Not Valid');
			return;
		}
		let value = form.value;
		this.product.productName = value.title;
		if(this.isNew){
			
			this.productService.createProduct(this.product).subscribe((newProduct:ProductNg) => {
				this.router.navigate(['/product',newProduct.id,'edit']);
			});
			
			//console.log('executed');
		}else{
			this.productService.updateProduct(this.product).subscribe(()=>{});			
		}
	}

}
