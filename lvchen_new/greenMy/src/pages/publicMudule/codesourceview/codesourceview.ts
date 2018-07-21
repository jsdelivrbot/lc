import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CodesourceviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codesourceview',
  templateUrl: 'codesourceview.html',
})
export class CodesourceviewPage {

  codes;
  selectOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,) {
   
    console.log(navParams);

   	this.codes = navParams.data;

    this.selectOptions = {title: '选择来源',mode: 'md'};

  }

  ionViewDidLoad() {
  }

  close() {
    this.viewCtrl.dismiss(this.codes);
  }

}
