import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeNgServiceMock } from 'src/app/Mock/RecipeNgServiceMock';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

import { RecipeListComponent } from './recipe-list.component';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeListComponent ],
      providers:[
        {provide:RecipeNgService, useClass: RecipeNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
