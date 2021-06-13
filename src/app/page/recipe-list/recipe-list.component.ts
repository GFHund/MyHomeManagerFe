import { Component, OnInit } from '@angular/core';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';
import { RecipeSimple } from 'src/OpenApi';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipeList: RecipeSimple[] = [];

  constructor(public recipeService: RecipeNgService) { }

  ngOnInit(): void {
    this.recipeService.getList().subscribe((recipes) => {
      this.recipeList = recipes;
    })
  }

  onDeleteRecipe(id: string|undefined){}
}
