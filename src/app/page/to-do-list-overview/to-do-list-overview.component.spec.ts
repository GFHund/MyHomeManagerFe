import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListOverviewComponent } from './to-do-list-overview.component';

describe('ToDoListOverviewComponent', () => {
  let component: ToDoListOverviewComponent;
  let fixture: ComponentFixture<ToDoListOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoListOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
