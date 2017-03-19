import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'itemlist',
  templateUrl: 'item-list.html'
})

export class ItemListDirective {

 submenus:any;
  selectedItem:any;
  constructor() {
 	this.submenus = ['Item1', 'Item12', 'Item13', 'Item14', 'Item15', 'Item15', 'Item17 and Pulavs', 'Item18'];
  }
 

  selectItem(index) {
    this.selectedItem = this.submenus[index];
 }
 
}
