import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductNgServiceMock } from 'src/app/Mock/ProductNgServiceMock';
import { RecipeNgServiceMock } from 'src/app/Mock/RecipeNgServiceMock';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';
import { FormInputComponent } from '../form-input/form-input.component';

import { RecipeIncredientEditComponent } from './recipe-incredient-edit.component';

describe('RecipeIncredientEditComponent', () => {
  let component: RecipeIncredientEditComponent;
  let fixture: ComponentFixture<RecipeIncredientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIncredientEditComponent,FormInputComponent ],
      imports:[FormsModule],
      providers:[
        {provide:ProductNgService, useClass:ProductNgServiceMock},
        {provide:RecipeNgService, useClass:RecipeNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeIncredientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
