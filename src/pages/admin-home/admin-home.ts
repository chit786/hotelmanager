import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Adminorders } from '../../providers/adminorders';
import { LoginPage } from '../login/login';
import {DomSanitizer} from '@angular/platform-browser';

/*
  Generated class for the AdminHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html'
})
export class AdminHomePage {
  menus : any;
  subMenus : any;
  showSubMenuFlag:any;
  selectedMenu:any;
  subAttachments : any;
  subMenuImages : any;
  showSubMenuImages:any;
  imagesNames =[];
  imagesSrcs = [];
  selectedSubMenu : any;
  selectedAttachDocRev : any;


  constructor(public navCtrl: NavController,public adminService: Adminorders, public navParams: NavParams,public alertCtrl: AlertController,public sanitizer : DomSanitizer) {}

  ionViewDidLoad() {
    this.showSubMenuFlag = false;
    this.showSubMenuImages = false;
    this.adminService.getMenus().then((data) => {
      this.menus = data;
    });
   
  }

  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  imageUploaded(subId,e){
     console.log((e));
   
      // this.subAttachments.push(e);
   this.adminService.putSubMenuAttachments(subId,e.file).then((result)=>{
     this.selectedAttachDocRev = (result as any)._rev;
   }).then(()=>{
     this.viewImages(subId);
   });
   
  }

  uploadAttachments(subId){

    var adminser = this.adminService;
    this.subAttachments.forEach(function(file){
      adminser.putSubMenuAttachments(subId,file);
    })
    

  }

  imageRemoved(e){
      this.adminService.removeAttachment(this.selectedSubMenu,e.file.name,this.selectedAttachDocRev).then((result)=>{
          this.selectedAttachDocRev = (result as any)._rev;
      }).then(()=>{
        this.viewImages(this.selectedSubMenu);
      });
  }

  viewImages(subMenu){

    this.imagesSrcs = [];
    this.imagesNames = [];
    this.showSubMenuImages = true;
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
             
          });
        }


    });

  }

  removeImage(imgIndex){
      this.adminService.removeAttachment(this.selectedSubMenu,this.imagesNames[imgIndex],this.selectedAttachDocRev).then((result)=>{
        console.log("removed");
        this.viewImages(this.selectedSubMenu);
      })
    

  }

  disableSendButton(e){

  }


  showSubMenus(menu){
    this.selectedMenu = menu;
    this.showSubMenuFlag = true;
    this.subMenus = menu.items;
  
  }

  logout(){
    this.adminService.logout();
    this.menus = null;
    this.navCtrl.setRoot(LoginPage);
  }

  addSubMenu(){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Add new item?',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'price',
          placeholder: 'Price'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {

           var item = {
             name : data.name,
             price : data.price
           }
                  this.subMenus.push(item);
              
                    this.adminService.updateMenu({
                    _id: this.selectedMenu._id,
                    _rev: this.selectedMenu._rev,
                    title: this.selectedMenu.title,
                    items: this.subMenus
                  });
                


          
          }
        }
      ]
    });
 
    prompt.present();

  }

  createMenu(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'Name your menu?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.adminService.createMenu({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateMenu(menu){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.adminService.updateMenu({
              _id: menu._id,
              _rev: menu._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }

  updateSubMenu(subMenu,index){

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'name',
          value: subMenu.name
        },
        {
          name: 'price',
          value: subMenu.price
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            for (var j in this.subMenus) {
              if (j== index) {
                  this.subMenus[index].name = data.name;
                  this.subMenus[index].price = data.price;
                    this.adminService.updateMenu({
                    _id: this.selectedMenu._id,
                    _rev: this.selectedMenu._rev,
                    title: this.selectedMenu.title,
                    items: this.subMenus
                  });
                  break; //Stop this loop, we found it!
              }
            }


          
          }
        }
      ]
    });
 
    prompt.present();

  }

  deleteSubMenu(subMenu){

    this.subMenus.splice(subMenu,1);
     this.adminService.updateMenu({
              _id: this.selectedMenu._id,
              _rev: this.selectedMenu._rev,
              title: this.selectedMenu.title,
              items: this.subMenus
            });

  }
 
  deleteMenu(menu){
    this.adminService.deleteMenu(menu);
  }
 
}
