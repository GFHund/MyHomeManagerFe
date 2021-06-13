import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFrameComponent } from './layout-frame.component';

describe('LayoutFrameComponent', () => {
  let component: LayoutFrameComponent;
  let fixture: ComponentFixture<LayoutFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
