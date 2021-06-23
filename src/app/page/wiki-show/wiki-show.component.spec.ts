import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiShowComponent } from './wiki-show.component';

describe('WikiShowComponent', () => {
  let component: WikiShowComponent;
  let fixture: ComponentFixture<WikiShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
