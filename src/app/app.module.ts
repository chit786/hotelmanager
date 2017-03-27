import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Todos } from '../providers/todos';
import { ClientServices } from '../providers/client-services';
import { Adminorders } from '../providers/adminorders';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ClientHomePage } from '../pages/client-home/client-home';
import {AdminHomePage} from '../pages/admin-home/admin-home';
import {ImageUploadModule} from 'angular2-image-upload';
import { ItemListComponent } from '../components/item-list/item-list';
import { SampleModalPage } from '../components/sample-modal/sample-modal';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ClientHomePage,
    AdminHomePage,
    ItemListComponent,
    SampleModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     ImageUploadModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ClientHomePage,
    AdminHomePage,
    ItemListComponent,
    SampleModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Todos,ClientServices,Adminorders]
})
export class AppModule {}
