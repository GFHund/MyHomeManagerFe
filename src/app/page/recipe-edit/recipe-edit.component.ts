import { RecipeNgService } from './../../service/recipeNg/recipe-ng.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeNg } from './../../model/RecipeNg';
import { ProductNgService } from './../../service/productNg/product-ng.service';
import { RecipeIncredientGet } from './../../../OpenApi/model/recipeIncredientGet';
import { RecipeStepGet } from './../../../OpenApi/model/recipeStepGet';
import { RecipeGet } from './../../../OpenApi/model/recipeGet';
import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  //obj: RecipeGet = { id: '', name: '', persons: 0, time: 0};
  recipe: RecipeNg = {id: '',persons: 0, time: 0, title: '',incredient: [], steps: []};
  //steps: RecipeStepGet[] = [];
  //incredients: RecipeIncredientGet[] = [];
  isNew: boolean = false;

  constructor(private productService:ProductNgService, 
    private recipeService: RecipeNgService, 
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.hasOwnProperty('id')){
        this.recipeService.getRecipe(params.id).subscribe(recipe => {
          console.log(recipe);
          this.recipe = recipe;
        });
      } else {
        this.isNew = true;
      }
    });
  }

  getProductName(productId:string|undefined){
    if(!productId){
      return '';
    }
    return this.productService.getProduct(productId).subscribe(product => {

    });
  }

  onSave(values:any){
    console.log(values);
    this.recipe.persons = values.persons;
    this.recipe.title = values.title;
    this.recipe.time = values.time;
    if(this.isNew){
      this.recipeService.createRecipe(this.recipe).subscribe((newRecipe:RecipeNg) => {
        this.router.navigate(['/recipe',newRecipe.id,'edit']);
      })
    } else {
      this.recipeService.updateRecipe(this.recipe).subscribe(()=>{});
    }
  }

  addStep(value:any){
    this.recipe.steps?.push({id:'',description:'',stepnumber:-1,recipeId:this.recipe.id});
  }
  addProduct(value:any){
    this.recipe.incredient.push({
      id:'',
      productId:'',
      amount:-1,
      productTitle:'',
      unit:'',recipeId:''});
  }
}
