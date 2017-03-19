import { Component } from '@angular/core';

/*
  Generated class for the ItemList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

  text: string;

   submenus:any;
  selectedItem:any;
  constructor() {
 	this.submenus = ['Item1', 'Item12', 'Item13', 'Item14', 'Item15', 'Item15', 'Item17 and Pulavs', 'Item18'];
  }
 

  selectItem(index) {
    this.selectedItem = this.submenus[index];
 }
 
}


