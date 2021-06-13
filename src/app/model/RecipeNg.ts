import { RecipeStepGet } from "src/OpenApi";
import { RecipeIncredientNg } from "./RecipeIncredientNg";
import { RecipeStepNg } from "./RecipeStepNg";

export interface RecipeNg{
    id: string,
    title: string,
    persons: number,
    time: number,
    incredient: RecipeIncredientNg[],
    steps:RecipeStepNg[]|undefined
}