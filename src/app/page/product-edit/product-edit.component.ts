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
	onLoad = true;
	@ViewChild('form') form?:NgForm = undefined;

  constructor(private productService:ProductNgService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
		this.route.params.subscribe(params => {
			if(params.hasOwnProperty('id')){
				this.productService.getProduct(params['id']).subscribe((product:ProductNg) => {
					this.product = product;
					this.onLoad = false;
				});
			}else {
				this.onLoad = false;
				this.isNew = true;
			}
		});
  }

	onSave(form:NgForm){
		console.log('clickOnSave');
		if(!form.valid){
			console.log('Not Valid');
			return;
		}
		let value = form.value;
		this.product.productName = value.title;
		this.onLoad = true;
		if(this.isNew){
			
			this.productService.createProduct(this.product).subscribe((newProduct:ProductNg) => {
				this.onLoad = false;
				this.router.navigate(['/product',newProduct.id,'edit']);
			});
			
			//console.log('executed');
		}else{
			this.onLoad = false;
			this.productService.updateProduct(this.product).subscribe(()=>{});	//toDO Update Implementing		
		}
	}

	onSaveAndNew(){
		console.log('clickOnSaveAndNew');
		if(!this.form?.valid){
			console.log('Not Valid');
			return;
		}
		let value = this.form?.value;
		this.product.productName = value.title;
		if(this.isNew){
			
			this.productService.createProduct(this.product).subscribe((newProduct:ProductNg) => {
				//this.router.navigate(['/product',newProduct.id,'edit']);
				//this.router.navigate(['/product/new']);
				this.product.productName = '';
			});
			
			//console.log('executed');
		}else{
			this.productService.updateProduct(this.product).subscribe(()=>{});//toDO Update Implementing		
		}
	}

}
