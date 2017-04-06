import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

/*
  Generated class for the ClientServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClientServices {
// add two plugins 

//1. Secure storage to save locally the table number
//====$ ionic plugin add cordova-plugin-secure-storage
//====$ npm install --save @ionic-native/secure-storage

//2. Device plugin To fetch and update server with hardware serial number of the devices
//====$ ionic plugin add cordova-plugin-device
//====$ npm install --save @ionic-native/device

// process  : when APP is launched it will try to lookup the table number in the securestorage of the device. There will be 
// 2 cases : a. table number is not available  , b. table number is available
// a. when table number is not available it will update the remote server about its availability by sending IMEI number and ADMIN can set the table number for this
//======when admin sets the table number the same will be updated in the local secure storage, same will be used for placing the orders
// if any updates on table number happens the same must be updated in already placed secure storage

  data: any;
  data_order:any;
  data_devices:any;
  db: any;
  db_orders : any;
  db_devices : any;
  remote: any;
  remote_devices : any;
  remote_orders : any;
  tblNo : any;
  invalidTblNo : any= ["TBD","BLOCKED","NOT IN USE"];

  constructor(public http: Http,private device: Device,private secureStorage: SecureStorage,private secureObj : SecureStorageObject) {
    this.secureObj.get("tblNo").then((value)=>{
        if(value){
          this.tblNo = value;
        }else{
          this.registerDevice();
          
        }
        
     
    }).catch(()=>{
      
    });
   this.init();
  }

  init(){
  
      this.db = new PouchDB('menus');
      this.db_orders = new PouchDB('orders')
      this.db_devices = new PouchDB('devices');
     
      this.remote = "http://127.0.0.1:5984/menus";
      this.remote_orders = "http://127.0.0.1:5984/orders";
      this.remote_devices = "http://127.0.0.1:5984/devices";
    
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
    this.db_orders.sync(this.remote_orders,options);
    this.db_devices.sync(this.remote_devices,options);

      this.db_devices.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleDeviceChange(change);
        });
 
 
 
  }
// servies related to Menus
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
          this.handleMenuChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      }); 
 
    });
 
  }
 
 
  handleMenuChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A menu was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
 
      //A menu was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
 
      //A menu was added
      else {
        this.data.push(change.doc); 
      }
 
    }
 
  }

// servies related to Orders
  getOrders() {
    if(this.invalidTblNo.indexOf(this.tblNo)<0){
    if (this.data_order) {
      return Promise.resolve(this.data_order);
    }
 
    return new Promise(resolve => {
      
      this.db_orders.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data_order = [];
 
        let docs = result.rows.map((row) => {
          this.data_order.push(row.doc);
        });
 
        resolve(this.data_order);
 
        this.db_orders.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleOrderChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      }); 
 
    });
    }else{
      this.data_order = [];
      return Promise.resolve(this.data_order);
    }
 
  }
 
  createOrder(order){
    if(this.invalidTblNo.indexOf(this.tblNo)<0){
      this.db_orders.post(order);
    }
    
  }
 
  updateOrder(order){
    if(this.invalidTblNo.indexOf(this.tblNo)<0){
       this.db_orders.put(order).catch((err) => {
        console.log(err);
      });
    }
   
  }
 
  deleteOrder(order){
     if(this.invalidTblNo.indexOf(this.tblNo)<0){
    this.db_orders.remove(order).catch((err) => {
      console.log(err);
    });
     }
  }
 
  handleOrderChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data_order.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.data_order.splice(changedIndex, 1);
    } 
    else {
 
      //A document was updated
      if(changedDoc){
        this.data_order[changedIndex] = change.doc;
      } 
 
      //A document was added
      else {
        this.data_order.push(change.doc); 
      }
 
    }
 
  }

  //device management services

 
  handleDeviceChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data_devices.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A menu was deleted
    if(change.deleted){
      this.data_devices.splice(changedIndex, 1);
    } 
    else {
 
      //A menu was updated
      if(changedDoc){
        this.data_devices[changedIndex] = change.doc;
      } 
 
      //A menu was added
      else {
        this.data_devices.push(change.doc); 
      }
 
    }

    
     this.secureObj.set('tblNo', change.doc.tableNumber)
        .then(
          (data) => {
            this.tblNo = change.doc.tableNumber;
          });
    
 
  }


  registerDevice(){

    let deviceDescription = {
      deviceSerial : this.device.serial,
      tableNumber : "TBD"
    }

    this.data_devices.post(deviceDescription);
    this.createSecureStorage("TBD");  

  }

  createSecureStorage(tblNo){

    this.secureStorage.create('tblNum_storage')
    .then((storage: SecureStorageObject) => {

     storage.set('tblNo', tblNo)
        .then(
          (data) => {
            this.tblNo = tblNo;
          });
      });
  }

 

}
