import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeNgServiceMock } from 'src/app/Mock/RecipeNgServiceMock';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

import { RecipeShowComponent } from './recipe-show.component';

describe('RecipeShowComponent', () => {
  let component: RecipeShowComponent;
  let fixture: ComponentFixture<RecipeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeShowComponent ],
      imports:[RouterTestingModule.withRoutes([])],
      providers:[
        {provide: RecipeNgService, useClass: RecipeNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
