import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingGroup } from 'src/app/model/SettingGroup';
import { SettingNgService } from 'src/app/service/setting/setting-ng.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public settingGroups: SettingGroup[] = [];

  constructor(protected settingService: SettingNgService) { }

  ngOnInit(): void {
    this.settingService.getSettings().subscribe((data:SettingGroup[]) => {
      this.settingGroups = data;
    });
  }
}
