import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SettingNgServiceMock } from 'src/app/Mock/SettingNgServiceMock';
import { SettingNgService } from 'src/app/service/setting/setting-ng.service';

import { SettingListComponent } from './setting-list.component';

describe('SettingListComponent', () => {
  let component: SettingListComponent;
  let fixture: ComponentFixture<SettingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingListComponent ],
      imports:[FormsModule],
      providers: [
        {provide: SettingNgService, useClass: SettingNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
