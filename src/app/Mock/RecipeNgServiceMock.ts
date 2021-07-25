import { Observable } from "rxjs";
import { RecipeSimple } from "src/OpenApi";
import { RecipeNg } from "../model/RecipeNg";

export class RecipeNgServiceMock{
    getList(): Observable<RecipeSimple[]>{
        return new Observable<RecipeSimple[]>((subscriber) => {
            subscriber.next([
                {
                  id: 'muffins',
                  name: 'Muffins'
                },
                {
                  id: 'quarkkuchenmuffins',
                  name: 'Quarkkuchen-Muffins'
                }
              ] as RecipeSimple[]);
        });
    }
    getRecipe(id: string): Observable<RecipeNg>{
      return new Observable<RecipeNg>(subscriber => {
        subscriber.next({
          id: 'abc123',
          incredient:[],
          persons:5,
          steps: [],
          time:30,
          title:'RecipeTitle'
        });
      })
    }
}