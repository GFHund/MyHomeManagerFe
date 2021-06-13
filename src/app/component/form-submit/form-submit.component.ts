import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss']
})
export class FormSubmitComponent implements OnInit {

  @Input() label = '';

  constructor() { }

  ngOnInit(): void {
  }

}
