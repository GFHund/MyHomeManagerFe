import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormSelectComponent } from 'src/app/component/form-select/form-select.component';
import { AppSettingsService } from 'src/app/service/appSettings/app-settings.service';
import { LocalStorageService } from 'src/app/service/localStorage/local-storage.service';
import { ToastService } from 'src/app/service/toast/toast.service';

import { AppSettingComponent } from './app-setting.component';

describe('AppSettingComponent', () => {
  let component: AppSettingComponent;
  let fixture: ComponentFixture<AppSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSettingComponent,FormSelectComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
