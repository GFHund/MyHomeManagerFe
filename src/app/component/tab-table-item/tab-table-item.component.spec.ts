import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTableItemComponent } from './tab-table-item.component';

describe('TabTableItemComponent', () => {
  let component: TabTableItemComponent;
  let fixture: ComponentFixture<TabTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabTableItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
