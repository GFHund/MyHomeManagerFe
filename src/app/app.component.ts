import { Component } from '@angular/core';
import { ShoppingListService } from 'src/OpenApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myHomeManagerFe';

  constructor(){
	
}

  networkTest(){
  }
}
