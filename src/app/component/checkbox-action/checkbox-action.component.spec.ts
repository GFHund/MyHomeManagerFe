import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxActionComponent } from './checkbox-action.component';

describe('CheckboxActionComponent', () => {
  let component: CheckboxActionComponent;
  let fixture: ComponentFixture<CheckboxActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
