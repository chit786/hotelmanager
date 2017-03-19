import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { ClientHomePage } from '../pages/client-home/client-home';
import { ItemListComponent } from '../components/item-list/item-list';


 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage : any;
 
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      if(platform.is('mobile') || platform.is('mobileweb')){
         StatusBar.styleDefault();
         Splashscreen.hide();
        this.nav.setRoot(ClientHomePage);
      }else{
        
        this.nav.setRoot(LoginPage);

      }

      
    });
  }
}