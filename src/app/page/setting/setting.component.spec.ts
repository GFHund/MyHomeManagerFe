import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingNgServiceMock } from 'src/app/Mock/SettingNgServiceMock';
import { SettingNgService } from 'src/app/service/setting/setting-ng.service';

import { SettingComponent } from './setting.component';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingComponent ],
      providers:[
        {provide: SettingNgService, useClass: SettingNgServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
