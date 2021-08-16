import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/OpenApi/model/shoppingList';
import { ShoppingListNgService } from 'src/app/service/shoppingListNg/shopping-list-ng.service';

@Component({
  selector: 'app-shopping-list-component',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  shoppingListList?: ShoppingList[];
  bLoading = true;

  constructor(public shoppingListService: ShoppingListNgService) { }

  ngOnInit(): void {
    this.shoppingListService.getList().subscribe((list: ShoppingList[]) => {
      this.bLoading = false;
      this.shoppingListList = list;
    });
  }

  onDeleteShoppingList(id: string|undefined): void{
    if (id === undefined){
      return;
    }
    this.shoppingListService.delete(id);
    this.shoppingListList = this.shoppingListList?.filter((value: ShoppingList,index: number) => {
      return value.id !== id;
    })
  }

}
