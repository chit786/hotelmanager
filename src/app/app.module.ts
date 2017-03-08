import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Todos } from '../providers/todos';
import { ItemListDirective } from '../pages/item-list/item-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemListDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemListDirective
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Todos]
})
export class AppModule {}
