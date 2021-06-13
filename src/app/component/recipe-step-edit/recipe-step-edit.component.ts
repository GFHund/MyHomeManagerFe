import { Component, Input, OnInit } from '@angular/core';
import { RecipeStepNg } from 'src/app/model/RecipeStepNg';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

@Component({
  selector: 'app-recipe-step-edit',
  templateUrl: './recipe-step-edit.component.html',
  styleUrls: ['./recipe-step-edit.component.scss']
})
export class RecipeStepEditComponent implements OnInit {

  @Input() step: RecipeStepNg = {id:'',description:'',stepnumber:-1,recipeId:''};
  @Input() recipeId: string = '';

  constructor(private recipeService:RecipeNgService) { }

  ngOnInit(): void {
  }

  isNew(){
    return this.step.id.length <=0;
  }
  onSave(values:any){
    console.log(values);
    const bNew = this.isNew();
    console.log(bNew);
    this.step.description = values.description;
    this.step.stepnumber = values.stepnumber;
    this.step.recipeId = this.recipeId;
    if(bNew){
      this.recipeService.createRecipeStep(this.step).subscribe((newStep:RecipeStepNg) => {
        this.step = newStep;
      });
    } else {
      this.recipeService.updateRecipeStep(this.step).subscribe(()=> {});
    }
  }
}
