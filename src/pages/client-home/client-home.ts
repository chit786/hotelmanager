import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from 'ionic-native';

/*
  Generated class for the ClientHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-home',
  templateUrl: 'client-home.html'
})
export class ClientHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientHomePage');
    
  }

}
