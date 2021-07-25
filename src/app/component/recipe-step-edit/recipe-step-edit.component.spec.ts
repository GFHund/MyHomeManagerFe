import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RecipeNgServiceMock } from 'src/app/Mock/RecipeNgServiceMock';
import { RecipeNgService } from 'src/app/service/recipeNg/recipe-ng.service';

import { RecipeStepEditComponent } from './recipe-step-edit.component';

describe('RecipeStepEditComponent', () => {
  let component: RecipeStepEditComponent;
  let fixture: ComponentFixture<RecipeStepEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeStepEditComponent ],
      imports:[FormsModule],
      providers:[
        {provide: RecipeNgService, useClass: RecipeNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
