import { Component,Input  } from '@angular/core';
import { ViewController,NavParams} from 'ionic-angular';
import { Adminorders } from '../../providers/adminorders';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'sample-modal',
  templateUrl: 'sample-modal.html'
})
export class SampleModalPage {

 todo :any;
  subAttachments : any;
  subMenuImages : any;
  showSubMenuImages:any;
  imagesNames =[];
  imagesSrcs = [];
  selectedSubMenu : any;
  selectedAttachDocRev : any;
  selectedCurrentMenu: any;
  uploadedSubMenu:any;
  constructor(private viewCtrl: ViewController,params: NavParams,public adminService: Adminorders,public sanitizer : DomSanitizer) {
  	console.log('modal params ssss');
  	console.log(params);
   this.todo = {
      name : params.data.name ? params.data.name : '',
      ingredients: params.data.ingredients ? params.data.ingredients : '',
      description: params.data.description ? params.data.description : '',
      price: params.data.price ? params.data.price : ''
    }
  	this.selectedSubMenu = params;
  }




photoURL(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  imageUploaded(subId,e){
    //  console.log((e));

        // console.log(this.selectedSubMenu.data.name);
   var Name = this.selectedSubMenu.data.name ? this.selectedSubMenu.data.name : this.todo.name;

   this.adminService.putSubMenuAttachments(Name, e.file).then((result)=>{
   	 
      this.uploadedSubMenu = result;
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
  	console.log('3');
    console.log(this.uploadedSubMenu);
      this.adminService.removeAttachment(this.uploadedSubMenu.id,e.file.name,this.selectedAttachDocRev).then((result)=>{
      	console.log('31');
          this.selectedAttachDocRev = (result as any)._rev;
console.log('32');
      }).then(()=>{
      	console.log('33');
        this.viewImages(this.uploadedSubMenu.id);
        console.log('34');
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
       
        this.viewImages(this.selectedSubMenu);
       
      })
    

  }


  dismiss(data) {
  	console.log('my modal data');
  	console.log(this.todo);
  	var newdata = {name: 'Abhay'};
    this.viewCtrl.dismiss(this.todo);
  }

}