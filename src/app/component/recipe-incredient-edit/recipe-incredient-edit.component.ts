import { Component, Input, OnInit } from '@angular/core';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';
import { RecipeIncredientNg} from '../../model/RecipeIncredientNg';

@Component({
  selector: 'app-recipe-incredient-edit',
  templateUrl: './recipe-incredient-edit.component.html',
  styleUrls: ['./recipe-incredient-edit.component.scss']
})
export class RecipeIncredientEditComponent implements OnInit {

  @Input() incredient: RecipeIncredientNg = {
    id:'',
    amount:0,
    productId:'',
    productTitle:'',
    unit:'',
    recipeId:''
  };
  @Input() recipeId: string = '';

  constructor(public productService:ProductNgService,private recipeService:RecipeNgService) { }

  ngOnInit(): void {
  }

  private isNew(){
    return this.incredient.id.length <= 0
  }

  onSave(values:any){
    console.log(values);
    const isNew = this.isNew();
    console.log(isNew);
    console.log(this.recipeId);
    this.incredient.amount = values.amount;
    this.incredient.unit = values.unit;
    this.incredient.productId = values.product;
    this.incredient.recipeId = this.recipeId;
    if(isNew){
      this.recipeService.createRecipeIncredient(this.incredient).subscribe((incredient) => {
        this.incredient = incredient;
      });
    } else {
      this.recipeService.updateRecipeIncredient(this.incredient).subscribe(()=>{});
    }
  }
}
