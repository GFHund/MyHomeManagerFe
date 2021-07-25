import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductNgServiceMock } from 'src/app/Mock/ProductNgServiceMock';
import { RecipeNgServiceMock } from 'src/app/Mock/RecipeNgServiceMock';
import { ProductNgService } from 'src/app/service/productNg/product-ng.service';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

import { RecipeEditComponent } from './recipe-edit.component';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeEditComponent ],
      imports: [RouterTestingModule.withRoutes([]),FormsModule],
      providers:[
        {provide: ProductNgService, useClass: ProductNgServiceMock},
        {provide: RecipeNgService, useClass: RecipeNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
