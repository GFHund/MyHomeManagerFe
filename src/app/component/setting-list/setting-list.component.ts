import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Setting } from 'src/app/model/Setting';
import { SettingNgService } from 'src/app/service/setting/setting-ng.service';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent implements OnInit {

  @Input() settings:Setting[] = [];

  constructor(protected settingService: SettingNgService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    
    let values = form.value;
    console.log(values);
    let valuesForSend = [];
    for(let i in values){
      if(!values.hasOwnProperty(i)) continue;
      for(let k in this.settings){
        if(!this.settings.hasOwnProperty(k)) continue;
        if(i === this.settings[k].valueId){
          valuesForSend.push({
            'value_id': i,
            'type': this.settings[k].type,
            'value': values[i]
          });
          break;
        }
      }
    }
    console.log(valuesForSend);
    this.settingService.updateSettings(valuesForSend).subscribe(() => {});
  }
}
