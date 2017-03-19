import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Component } from "@angular/core"; 

/*
  Generated class for the Adminorders provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Adminorders {

  data: any;
  db: any;
  remote: any;
  isValidCall : any;
  db_attach : any;
  remote_attach : any;

  constructor(public http: Http) {

    
    
  }

  init(details){
    if(details.userDBs.supertest){
      this.isValidCall = true;
      this.db = new PouchDB('adminOrder');
      this.db_attach = new PouchDB('submenuAttachments');
    this.remote = "http://192.168.178.89:5984/menus";
    this.remote_attach = "http://192.168.178.89:5984/submenuattachments";
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
    this.db_attach.sync(this.remote_attach,options);
 
    console.log(this.db);
    console.log(this.db_attach);

    }else{
      console.log("unauthorized call! please login again!");
      this.data = null;
       this.db.destroy().then(() => {
          console.log("database removed");
        
      });
      this.db_attach.destroy().then(() => {
          console.log("database removed");
        
      });
    }
    
 
 
  }

  logout(){
 
    this.data = null;
 
    this.db.destroy().then(() => {
      console.log("database removed");
    });
  }

  getSubMenuAttachments(subId){
        return new Promise(resolve => {
          this.db_attach.get(subId,{attachments: true}).then(function (doc) {
            resolve(doc);
          })
        }).catch((error) => {
 
        console.log(error);
 
      });
   
  }

  getAttachment(dbName,attName){

     return new Promise(resolve => {
          this.db_attach.getAttachment(dbName,attName).then(function (blob) {
            resolve(blob);
          })
        }).catch((error) => {
 
        console.log(error);
 
      });

  }

  removeAttachment(docName,fileName,revId){
     return new Promise(resolve => {
           this.db_attach.removeAttachment(docName, fileName, revId).then(function (result) {
            resolve(result);
          })
        }).catch((error) => {
 
        console.log(error);
 
      });

  
  }
  


  putSubMenuAttachments(subid,file){
    var db = this.db_attach;
     return new Promise(resolve => {
    this.db_attach.get(subid).then(function(doc){
      if(doc){
            db.putAttachment(subid,file.name,doc._rev,file,file.type).then(function (result) {
          console.log("uploaded");
          resolve(result);
          }).catch(function (err) {
            console.log(err);
          });
      }else{
          db.putAttachment(subid,file.name,file,file.type).then(function (result) {
      console.log("uploaded");
       resolve(result);
      }).catch(function (err) {
        console.log(err);
      });
      }
    })
     });

 

  }

  removeSubMenuAttachments(subId){
    this.db_attach.remove(subId).catch((err) => {
      console.log(err);
    });
  }


  getMenus() {
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      
      this.db.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
 
        resolve(this.data);
 
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      }); 
 
    });
 
  }
 
  createMenu(menu){
    this.db.post(menu);
  }
 
  updateMenu(menu){
    this.db.put(menu).catch((err) => {
      console.log(err);
    });
  }
 
  deleteMenu(menu){
    this.db.remove(menu).catch((err) => {
      console.log(err);
    });
  }
 
  handleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
 
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
 
      //A document was added
      else {
        this.data.push(change.doc); 
      }
 
    }
 
  }
 

}
