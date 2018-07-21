import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CodeviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codeview',
  templateUrl: 'codeview.html',
})
export class CodeviewPage {
   
  codes;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,) {
   
    console.log(navParams);

   	this.codes = navParams.data;

  }

  ionViewDidLoad() {

  }

  close() {
    this.viewCtrl.dismiss();
  }
}
