import { Component,Input,ViewChild } from '@angular/core';
import { Adminorders } from '../../providers/adminorders';
import { NavController, NavParams,AlertController, ModalController,Slides} from 'ionic-angular';
import { SampleModalPage } from '../sample-modal/sample-modal'
import {DomSanitizer} from '@angular/platform-browser';


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
  @ViewChild(Slides) slides: Slides;

  selectedMenu : { _id: string, _rev: string,title: string,items:any};
  text: string;
  submenus = [];
  selectedItem:any;
  subMenuIndex:any;
  imagesNames =[];
  imagesSrcs = [];
  selectedAttachDocRev : any;
  selectedCurrentMenu: any;
  showSubMenuImages:any;
  selectedSubMenu : any;
  slideImages: any;

   
  constructor(public adminService: Adminorders, public alertCtrl: AlertController,public nav: NavController, public Modal: ModalController,public sanitizer : DomSanitizer) {
   //this.submenus = this.selectedMenu ? this.selectedMenu.items : this.submenus;
   console.log("asdasdasdasda");
   console.log(this.submenus);
  }


  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

 goToSlide(side) {
    let currentIndex = this.slides.getActiveIndex() + (side === 'right' ? 1 : -1);
    this.slides.slideTo(currentIndex, 500);
  }

  selectItem(index) {
    this.subMenuIndex=index;
    this.selectedItem = this.selectedMenu.items[index];
     console.log(this.selectedItem.name);
    this.viewImages(this.selectedItem.name).then((images)=>{
      this.slideImages = images;
       console.log(this.slideImages);
    }).catch((err)=>{
      this.slideImages=[];
    });
    console.log("<--------------images---------->");
   
  }

  openmodal(params) {
     this.submenus = this.selectedMenu.items ? this.selectedMenu.items : this.submenus;
   // var params =  this.selectedItem;
    const modal = this.Modal.create(SampleModalPage, params);
     modal.onDidDismiss(data => {
       
       console.log('data in modal');
            console.log(data);
            console.log(this.selectedMenu);
            if(data){
             var item = {
               name : data.name,
               price : data.price,
               description: data.description,
               ingredients: data.ingredients
             }
             if(!params){
                    this.submenus.push(item);
             }else {
               this.submenus[this.subMenuIndex] = item;
               this.selectedItem = item;
             } 
                
                      this.adminService.updateMenu({
                      _id: this.selectedMenu._id,
                      _rev: this.selectedMenu._rev,
                      title: this.selectedMenu.title,
                      items: this.submenus
                    });
            }
   });
    modal.present(modal);
  }

editSubMenu(){
  this.openmodal(this.selectedItem);
}

  viewImages(subMenu){

    this.imagesSrcs = [];
    this.imagesNames = [];
    this.showSubMenuImages = true;
   return new Promise(resolve => {
    this.adminService.getSubMenuAttachments(subMenu).then((doc)=>{
      
      var url;
        for(var key in (doc as any)._attachments){
     
          this.selectedSubMenu = (doc as any)._id;
          this.selectedAttachDocRev = (doc as any)._rev;
          this.imagesNames.push(key);
          this.adminService.getAttachment(subMenu,key).then(function (blob){
            
            url = URL.createObjectURL(blob);
           
          }).then(()=>{
           
             this.imagesSrcs.push(url);
             resolve(this.imagesSrcs);
             
          }).catch((err)=>{
            resolve(null);
          });
        }


    });
    });

  }

deleteSubMenu(item){
  this.submenus.splice( this.subMenuIndex, 1 );
   this.adminService.updateMenu({
                      _id: this.selectedMenu._id,
                      _rev: this.selectedMenu._rev,
                      title: this.selectedMenu.title,
                      items: this.submenus
                    });
               this.selectedItem = undefined;
}

  addSubMenu(){
    var params;
    this.openmodal(params);

  }

}


