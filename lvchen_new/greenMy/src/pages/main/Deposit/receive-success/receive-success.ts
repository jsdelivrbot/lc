import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReceiveSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-success',
  templateUrl: 'receive-success.html',
})
export class ReceiveSuccessPage {
  data;
  goodNum;
  giftNum;
  presentNum;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  	this.data = this.navParams.data;
  	this.goodNum = this.data.goods.length;
    this.giftNum = this.data.gifts.length;
    this.presentNum = this.data.presentMap.length;
    for (var i = 0; i < this.data.presentMap.length; ++i) {
      let present = this.data.presentMap[i];
      if (present.source == 0) {
        present.source = '借门店';
      }else if (present.source == 1){
        present.source = '欠顾客';
      }else{
        present.source = '其它';
      }
    }
    console.log(this.data);
  }

  ionViewDidLoad() {
   
  }

  onBack(){
    this.navCtrl.popToRoot();
  }
}
