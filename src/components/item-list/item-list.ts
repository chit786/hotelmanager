import { Component,Input } from '@angular/core';
import { Adminorders } from '../../providers/adminorders';
import { NavController, NavParams,AlertController, ModalController} from 'ionic-angular';
import { SampleModalPage } from '../sample-modal/sample-modal'


/*
  Generated class for the ItemList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html',
  inputs: ['selectedMenu: selectedMenu'],
})
export class ItemListComponent {
  selectedMenu : { _id: string, _rev: string,title: string,items:any};
  text: string;
  submenus = [];
  selectedItem:any;

   
  constructor(public adminService: Adminorders, public alertCtrl: AlertController,public nav: NavController, public Modal: ModalController) {
   //this.submenus = this.selectedMenu ? this.selectedMenu.items : this.submenus;
   console.log("asdasdasdasda");
   console.log(this.submenus);
  }

  selectItem(index) {
    this.selectedItem = this.selectedMenu.items[index];
  }

  openmodal() {
     this.submenus = this.selectedMenu.items ? this.selectedMenu.items : this.submenus;
     var params =  this.selectedItem;
    const modal = this.Modal.create(SampleModalPage, params);
     modal.onDidDismiss(data => {
       console.log('data in modal');
            console.log(data);
           var item = {
             name : data.name,
             price : data.price,
             description: data.description,
             ingredients: data.ingredients
           }
                  this.submenus.push(item);
              
                    this.adminService.updateMenu({
                    _id: this.selectedMenu._id,
                    _rev: this.selectedMenu._rev,
                    title: this.selectedMenu.title,
                    items: this.submenus
                  });

                
   });
    modal.present(modal);
  }


  addSubMenu(){

    this.openmodal();
   // this.submenus = this.selectedMenu.items ? this.selectedMenu.items : this.submenus;
    // let prompt = this.alertCtrl.create({
    //   title: 'Edit',
    //   message: 'Add new item?',
    //   inputs: [
    //     {
    //       name: 'name',
    //       placeholder: 'Name'
    //     },
    //     {
    //       name: 'price',
    //       placeholder: 'Price'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel'
    //     },
    //     {
    //       text: 'Add',
    //       handler: data => {
    //         console.log('data in modal');
    //         console.log(data);
    //        var item = {
    //          name : data.box,
    //          price : data.price
    //        }
    //               this.submenus.push(item);
              
    //                 this.adminService.updateMenu({
    //                 _id: this.selectedMenu._id,
    //                 _rev: this.selectedMenu._rev,
    //                 title: this.selectedMenu.title,
    //                 items: this.submenus
    //               });
                


          
    //       }
    //     }
    //   ]
    // });
 
   // prompt.present();

  }

}


