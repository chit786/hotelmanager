import { Component,Input } from '@angular/core';
import { ViewController} from 'ionic-angular';

@Component({
	selector: 'sample-modal',
  templateUrl: 'sample-modal.html'
})
export class SampleModalPage {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
  	console.log('my modal data');
  	console.log(data);
    this.viewCtrl.dismiss(data);
  }

}