import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeNg } from 'src/app/model/RecipeNg';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

@Component({
  selector: 'app-recipe-show',
  templateUrl: './recipe-show.component.html',
  styleUrls: ['./recipe-show.component.scss']
})
export class RecipeShowComponent implements OnInit {

  id = '';
  recipe?: RecipeNg;

  constructor(public recipeService: RecipeNgService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.recipeService.getRecipe(this.id).subscribe(recipe => {
        this.recipe = recipe;
      })
    });
  }

}
