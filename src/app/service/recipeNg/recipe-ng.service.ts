
import { LocalStorageService } from './../localStorage/local-storage.service';
import { AppSettingsService } from './../appSettings/app-settings.service';
import { Injectable } from '@angular/core';
import { merge, Observable, Subscriber } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { RecipeIncredientNg } from 'src/app/model/RecipeIncredientNg';
import { RecipeNg } from 'src/app/model/RecipeNg';
import { RecipeStepNg } from 'src/app/model/RecipeStepNg';
import { RecipeGet, RecipeIncredientGet, RecipeIncredientWrite, RecipeService, RecipeSimple, RecipeStepGet, RecipeStepWrite, RecipeWrite } from 'src/OpenApi';
import { ProductNgService } from '../productNg/product-ng.service';
import { AppModes } from 'src/app/model/AppSettings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeNgService {

  constructor(public recipeService: RecipeService,
    public product: ProductNgService,
    private localStorage:LocalStorageService,
    private appSetting:AppSettingsService) {
    this.recipeService.configuration.basePath = environment.serverUrl;
   }

  getList(): Observable<RecipeSimple[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<RecipeSimple[]>((subscriber) => {
          setTimeout(() => {
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
          },1000)
        });
      } else if(mode == AppModes.OFFLINE){
        return this.localStorage.get('recipeList').pipe(map((sRecipes:string|null) => {
          if(sRecipes === null){
            return [];
          }
          let aRecipes = JSON.parse(sRecipes);
          if(aRecipes == null){
            return [];
          } else {
            return aRecipes;
          }
        }));
      } else if(mode == AppModes.LIVE){
        return this.recipeService.getRecipeList().pipe(tap(recipes => {
          let sRecipes = JSON.stringify(recipes);
          this.localStorage.set('recipeList',sRecipes);
        }));
      } else  {
        return [];
      }

    }));
  }

  getRecipeItem(id: string): Observable<RecipeGet>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<RecipeGet>(subscriber => {
          setTimeout(() => {
            if (id === 'muffins') {
              subscriber.next({
                id: 'muffins',
                name: 'Muffins',
                persons: 4,
                time: 25
              } as RecipeGet)
            } else if(id === 'quarkkuchenmuffins') {
              subscriber.next({
                id: 'quarkkuchenmuffins',
                name: 'Quarkkuchen-Muffins',
                persons: 4,
                time: 37
              } as RecipeGet)
            } else {
              subscriber.next( {id:'',name:'',persons:0,time:0} as RecipeGet);  
            }
            
          }, 1000);
        });
      }
      else if(mode == AppModes.OFFLINE){
        return this.localStorage.get('recipe'+id).pipe(map(sRecipe => {
          if(sRecipe == null){
            return {id:'',name:'',persons:0,time:0} as RecipeGet;
          }
          let recipe = JSON.parse(sRecipe);
          if(recipe == null){
            return {id:'',name:'',persons:0,time:0} as RecipeGet;
          } else {
            return recipe as RecipeGet;
          }
        }))
      }
      else if(mode == AppModes.LIVE){
        return this.recipeService.getRecipeItem(id).pipe(tap(recipe => {
          let sRecipe = JSON.stringify(recipe);
          this.localStorage.set('recipe'+id,sRecipe);
        }
        ));
      }
      else{
        return new Observable<RecipeGet>(subscriber => {
          subscriber.next({id:'',name:'',persons:0,time:0} as RecipeGet)
        });
      }
    }));
    
  }
  getRecipeIncredient(id: string): Observable<RecipeIncredientNg[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      var observable:Observable<RecipeIncredientGet[]>;
      if(mode == AppModes.DEMO){
        observable = new Observable<RecipeIncredientGet[]>(subscriber => {
          setTimeout(() => {
            subscriber.next(this.getIncredientMock(id));
          }, 1000);
        })
      } else if(mode == AppModes.OFFLINE){
        observable = this.localStorage.get('recipeIncredient'+id).pipe(map(sIncredients => {
          if(sIncredients == null){
            return [];
          }
          let oIncredients = JSON.parse(sIncredients);
          if(oIncredients == null){
            return [];
          } else {
            return oIncredients;
          }
        }))
      } else if(mode == AppModes.LIVE){
        observable = this.recipeService.getRecipeIncredients(id).pipe(tap(incredient => {
          let sIncredient = JSON.stringify(incredient);
          this.localStorage.set('recipeIncredient'+id,sIncredient);
        }));
      } else {
        observable = new Observable<RecipeIncredientGet[]>(subscriber => {
          subscriber.next([]);
        });
      }
      //return observable;
      return observable.pipe(
        mergeMap((incredients: RecipeIncredientGet[]) => {
          let ids: string[] = [];
          for(const i in incredients){
            if(!incredients.hasOwnProperty(i)){
              continue;
            }
            if(incredients[i].productId !== undefined && incredients[i].productId !== null){
              ids.push(incredients[i].productId!);
            }
          }
          return this.product.getList(ids).pipe(map(products => {
            
            let ret: RecipeIncredientNg[] = [];
            for(const i in incredients){
              if(!incredients.hasOwnProperty(i)){
                continue;
              }
              for(const k in products){
                if(!products.hasOwnProperty(k)){
                  continue;
                }
                if(products[k].id === incredients[i].productId){
                  const obj: RecipeIncredientNg = {
                    amount: incredients[i].amount ?? 0,
                    unit: incredients[i].unit ?? '',
                    productId: products[k].id ?? '',
                    productTitle: products[k].productName ?? '',
                    id:'',
                    recipeId:id
                  }
                  ret.push(obj);
                }
              }
            }
            return ret;
          }));
        })
      );
    }));
  }

  getRecipeSteps(id: string): Observable<RecipeStepGet[]>{
    return this.appSetting.getMode().pipe(mergeMap((mode) => {
      if(mode == AppModes.DEMO){
        return new Observable<RecipeStepGet[]>(subscriber => {
          setTimeout(() => {
            subscriber.next(this.getRecipeStepMock(id));
          },1000)
        });
      } else if(mode == AppModes.OFFLINE){
        return this.localStorage.get('recipeStep'+id).pipe(map(sStep  => {
          if(sStep == null){
            return [];
          }
          let oStep = JSON.parse(sStep);
          if(oStep == null){
            return [];
          } else {
            return oStep;
          }
        }))
      } else if(mode == AppModes.LIVE){
        return this.recipeService.getRecipeSteps(id).pipe(tap(step => {
          let sStep = JSON.stringify(step);
          this.localStorage.set('recipeStep'+id,sStep);
        }));
      } else {
        return new Observable<RecipeStepGet[]>(subscriber => {
          subscriber.next([]);
        });
      }
    }));
    //this.recipeService.getRecipeSteps();
    if(true){
      
    }else {
      
    }
    
  }

  getRecipe(id: string): Observable<RecipeNg>{
    return this.getRecipeItem(id).pipe(
      mergeMap(recipe => {
        return this.getRecipeIncredient(id).pipe(map((incredient) => {
          let retRecipe: RecipeNg = {
            id: recipe.id!,
            persons: recipe.persons!,
            time: recipe.time!,
            incredient: incredient,
            title: recipe.name!,
            steps: undefined
          }
          console.log(retRecipe);
          return retRecipe;
        }))
      }),
      mergeMap(recipe => {
        console.log('getSteps');
        return this.getRecipeSteps(id).pipe(map(steps => {
          recipe.steps = [];
          for(const i in steps){
            if(!steps.hasOwnProperty(i)) continue;
            recipe.steps.push(this.convertStep(steps[i]));
          }
          console.log(recipe);
          return recipe;
        }))
      })
    );
  }
  createRecipe(newRecipe: RecipeNg):Observable<RecipeNg>{
    if(true){
      var write: RecipeWrite = {
        name: newRecipe.title,
        persons: newRecipe.persons,
        time: newRecipe.time
      };
      return this.recipeService.createRecipe(write).pipe(map(
        (retrivedNewRecipe:RecipeGet) => {
          return {
             id: retrivedNewRecipe.id??'',
             persons: retrivedNewRecipe.persons??0,
             time: retrivedNewRecipe.time?? 0,
             title: retrivedNewRecipe.name??'',
             incredient:[],
             steps:[]
          }as RecipeNg;
        }
      ))
    } else {
      newRecipe.id = newRecipe.title;
      return new Observable<RecipeNg>((subscriber) => {
        setTimeout(()=>{
          subscriber.next(newRecipe);
        },1000);
      });
    }
    
  }
  updateRecipe(recipe: RecipeNg):Observable<void>{
    return new Observable<void>((subscriber) => {
      setTimeout(()=>{
        subscriber.next();
      },1000);
    });
  }
  createRecipeIncredient(newIncredient: RecipeIncredientNg): Observable<RecipeIncredientNg>{
    if(true){
      let incredientWrite: RecipeIncredientWrite = {
        amount: newIncredient.amount,
        unit: newIncredient.unit
      };
      let productId = newIncredient.productId;
      let recipeId = newIncredient.recipeId;
      return this.recipeService.createRecipeIncredient(recipeId,productId,incredientWrite).pipe(map(
        (retrivedNewIncredient:RecipeIncredientGet) =>{
          return {
            id:'',
            amount: retrivedNewIncredient.amount??0,
            productId: retrivedNewIncredient.productId??'',
            productTitle:'',
            recipeId:'',
            unit:retrivedNewIncredient.unit??''
          } as RecipeIncredientNg;
        }
      ))
    } else {
      newIncredient.id = newIncredient.productId+newIncredient.amount+newIncredient.unit;
      return new Observable<RecipeIncredientNg>((subscriber) => {
        setTimeout(() => {
          subscriber.next(newIncredient);
        },1000);
      });
    }
    
  }
  updateRecipeIncredient(incredient:RecipeIncredientNg): Observable<void>{
    return new Observable<void>((subscriber) => {
      setTimeout(() => {
        subscriber.next();
      })
    })
  }
  createRecipeStep(newStep: RecipeStepNg): Observable<RecipeStepNg>{
    if(true){
      let recipeId = newStep.recipeId;
      let stepWrite:RecipeStepWrite = {
        description:newStep.description,
        stepnumber: newStep.stepnumber
      };
      return this.recipeService.createRecipeStep(recipeId,stepWrite).pipe(map(
        (retrivedStep:RecipeStepGet) => {
          return {
            id: retrivedStep.id??'',
            description: retrivedStep.description ?? '',
            stepnumber: retrivedStep.stepnumber ?? 1,
            recipeId: recipeId
          } as RecipeStepNg;
        } 
      ));
    } else {
      return new Observable<RecipeStepNg>((subscriber) => {
        setTimeout(() => {
          subscriber.next(newStep);
        },1000);
      });
    }
    
  }
  updateRecipeStep(step: RecipeStepNg): Observable<RecipeStepNg>{
    if(true){
      let recipeStepWrite:RecipeStepWrite = {
        description: step.description,
        stepnumber: step.stepnumber
      }
      return this.recipeService.updateRecipeStep(step.recipeId,step.id,recipeStepWrite).pipe(map(
        (retrivedStep: RecipeStepGet) => {
          return {
            id: retrivedStep.id ?? '',
            description: retrivedStep.description ?? '',
            stepnumber: retrivedStep.stepnumber ?? -1,
            recipeId: step.recipeId
          }as RecipeStepNg;
        }
      )
        
      );
    } else {
      return new Observable<RecipeStepNg>((subscriber) => {
        setTimeout(() => {
          subscriber.next(step);
        },1000);
      });
    }
    
  }
  convertStep(stepApi: RecipeStepGet):RecipeStepNg{
    return {
      id:stepApi.id ?? '',
      description: stepApi.description ?? '',
      stepnumber: stepApi.stepnumber ?? 0,
      recipeId: ''
    };
  }

  getIncredientMock(id:string){
    if(id === 'muffins'){
      return [
        {
          recipeId: 'muffins',
          productId: 'eier',
          amount: 2,
          unit: 'Stück'
        },
        {
          recipeId: 'muffins',
          productId: 'rapsoel',
          amount: 125,
          unit: 'ml'
        },{
          recipeId: 'muffins',
          productId:'milch',
          amount: 250,
          unit:'ml'
        }, {
          recipeId: 'muffins',
          productId: 'zucker',
          amount: 200,
          unit: 'g'
        }, {
          recipeId: 'muffins',
          productId: 'mehl',
          amount: 400,
          unit: 'g'
        }
      ] as RecipeIncredientGet[];
    }
    else if(id === 'quarkkuchenmuffins'){
      return [
        {
          recipeId: 'quarkkuchenmuffins',
          productId: 'magerquark',
          amount: 500,
          unit: 'g'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'eier',
          amount: 2,
          unit: 'Stück'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'gries',
          amount: 2,
          unit: 'El'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'backpulver',
          amount: 0.5,
          unit: 'Tl'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'butter',
          amount: 100,
          unit: 'g'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'zucker',
          amount: 170,
          unit: 'g'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'vanillezucker',
          amount: 1,
          unit: 'Pk'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'vanillepuddingpulver',
          amount: 1,
          unit: 'Pk'
        }, {
          recipeId: 'quarkkuchenmuffins',
          productId: 'Zitronensaft',
          amount: 1,
          unit: 'bischen'
        }
      ] as RecipeIncredientGet[];
    } else {
      return [];
    }
  }

  getRecipeStepMock(id:string){
    if(id === 'muffins'){
      return[
        {
          id:'abc',
          description: 'Eier, Öl, Milch und Zucker in einen Topf geben',
          stepnumber: 1
        },
        {
          id:'abce',
          description: 'Alles miteinander Verrühren',
          stepnumber: 2
        }, {
          id:'abcef',
          description: 'Mehl mit Backpulver vermischen',
          stepnumber: 3
        },
        {
          id:'abcefg',
          description: 'Mehlgemisch zum Eiergemisch hinzugeben und unterrühren',
          stepnumber: 4
        },
        {
          id:'abcefgh',
          description: 'Die Masse in ein Muffinblech geben und bei 180° 20 Minuten backen',
          stepnumber: 5
        }
      ] as RecipeStepGet[]
    } else if(id === 'quarkkuchenmuffins'){
      return[
        {
          id:'babc',
          description: 'Alle Zutaten vermengen',
          stepnumber: 1
        },
        {
          id:'babce',
          description: 'Bei 180° 30-40 Minuten Backen',
          stepnumber: 2
        }
      ] as RecipeStepGet[];
    } else {
      return [];
    }
  }
}
