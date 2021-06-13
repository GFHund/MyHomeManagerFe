import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIncredientEditComponent } from './recipe-incredient-edit.component';

describe('RecipeIncredientEditComponent', () => {
  let component: RecipeIncredientEditComponent;
  let fixture: ComponentFixture<RecipeIncredientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIncredientEditComponent ]
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
