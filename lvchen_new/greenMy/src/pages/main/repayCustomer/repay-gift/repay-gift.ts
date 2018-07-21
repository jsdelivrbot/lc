import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the RepayGiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repay-gift',
  templateUrl: 'repay-gift.html',
})
export class RepayGiftPage {
  protected phone: string;
  protected repayGiftArray: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice: AppService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepayGiftPage');
  }

  ionViewWillEnter() {
    this.appservice.httpPost('findOweGoodsOrder.api', { phone: this.phone }, data => {
      console.log(data.data)
      if (data.code == 1) {
        this.repayGiftArray = data.data;
      } else {
        this.appservice.toast(data.msg);
      }
    })
  }

  onKeyboard($event) {
    if ($event.key == 'Enter') {
      this.onSearch();
    }
  }

  onSearch(){

    if (this.phone.length != 11) {
      this.appservice.toast("请输入正确的手机号码");
      return; 
    }
    this.appservice.httpPost('findOweGoodsOrder.api', { phone: this.phone }, data => {
        if (data.code == 1) {
          if (data.data.length == 0) {
            this.appservice.toast("没有查询到数据");
          }
          this.repayGiftArray = data.data;
        } else {
          this.appservice.toast(data.msg);
        }
    })
  }

  repayGiftdetail(phone: any): void {
    this.navCtrl.push('RepayGiftDetailPage', { phone: phone }, {
      animation: 'md-transition'
    })
  }

}
