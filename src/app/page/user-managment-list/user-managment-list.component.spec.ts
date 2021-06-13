import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagmentListComponent } from './user-managment-list.component';

describe('UserManagmentListComponent', () => {
  let component: UserManagmentListComponent;
  let fixture: ComponentFixture<UserManagmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
