import { Component } from '@angular/core';
import { ShoppingListService } from 'src/OpenApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myHomeManagerFe';

  constructor(private shoppingListService:ShoppingListService){
	this.shoppingListService.configuration.basePath = 'http://127.0.0.1:8080';
}

  networkTest(){
	this.shoppingListService.getShoppingLists().subscribe((value) => {
		console.log(value);
	});
  }
}
