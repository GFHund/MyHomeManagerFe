import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntitySelectComponent } from './form-entity-select.component';

describe('FormEntitySelectComponent', () => {
  let component: FormEntitySelectComponent;
  let fixture: ComponentFixture<FormEntitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntitySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
