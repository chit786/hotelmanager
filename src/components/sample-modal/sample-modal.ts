import { Component,Input } from '@angular/core';
import { ViewController,NavParams} from 'ionic-angular';
import { Adminorders } from '../../providers/adminorders';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'sample-modal',
  templateUrl: 'sample-modal.html'
})
export class SampleModalPage {
todo = {};
  subAttachments : any;
  subMenuImages : any;
  showSubMenuImages:any;
  imagesNames =[];
  imagesSrcs = [];
  selectedSubMenu : any;
  selectedAttachDocRev : any;
  selectedCurrentMenu: any;
  constructor(private viewCtrl: ViewController,params: NavParams,public adminService: Adminorders,public sanitizer : DomSanitizer) {
  	console.log(params);
  }


photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

    imageUploaded(subId,e){
     console.log((e));
        console.log(subId);
   
      // this.subAttachments.push(e);
   this.adminService.putSubMenuAttachments(subId,e.file).then((result)=>{
   	 console.log('1');
     this.selectedAttachDocRev = (result as any)._rev;
   }).then(()=>{
   	console.log('12');
     this.viewImages(subId);
     console.log('13');
   });
   
  }

  uploadAttachments(subId){

    var adminser = this.adminService;
    console.log('2');
    this.subAttachments.forEach(function(file){
    	console.log('21');
      adminser.putSubMenuAttachments(subId,file);
      console.log('22');
    })
    

  }

  
  imageRemoved(e){
  	console.log('3');
      this.adminService.removeAttachment(this.selectedSubMenu,e.file.name,this.selectedAttachDocRev).then((result)=>{
      	console.log('31');
          this.selectedAttachDocRev = (result as any)._rev;
console.log('32');
      }).then(()=>{
      	console.log('33');
        this.viewImages(this.selectedSubMenu);
        console.log('34');
      });
  }

  viewImages(subMenu){

    this.imagesSrcs = [];
    this.imagesNames = [];
    this.showSubMenuImages = true;
    console.log('4');
    this.adminService.getSubMenuAttachments(subMenu).then((doc)=>{
    	console.log('41');
      var url;
        for(var key in (doc as any)._attachments){
        	console.log('42');
          this.selectedSubMenu = (doc as any)._id;
          this.selectedAttachDocRev = (doc as any)._rev;
          this.imagesNames.push(key);
          this.adminService.getAttachment(subMenu,key).then(function (blob){
          	console.log('43');
            url = URL.createObjectURL(blob);
            console.log('44');
          }).then(()=>{
            console.log('45');
             this.imagesSrcs.push(url);
             console.log('46');
             
          });
        }


    });

  }

  removeImage(imgIndex){
  	console.log('5');
      this.adminService.removeAttachment(this.selectedSubMenu,this.imagesNames[imgIndex],this.selectedAttachDocRev).then((result)=>{
        console.log("removed");
        console.log('51');
        this.viewImages(this.selectedSubMenu);
        console.log('52');
      })
    

  }


  dismiss(data) {
  	console.log('my modal data');
  	console.log(this.todo);
  	var newdata = {name: 'Abhay'};
    this.viewCtrl.dismiss(this.todo);
  }

}