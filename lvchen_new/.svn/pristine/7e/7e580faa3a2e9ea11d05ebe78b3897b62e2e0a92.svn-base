import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the DepositsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposits',
  templateUrl: 'deposits.html',
})
export class DepositsPage {
  data;
  phoneNos;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: AppService, 
    public platform: Platform) {
  }

  ngOnInit() {

    this.getData();

  }

  search($event) {
    if ($event.key == 'Enter') {
      this.getData();
    }
  }
  onSearch(){
    this.getData();
  }

  getData() {
    this.app.httpPost('findCheckInOrderGoods.api', { phoneNos: this.phoneNos }, data => {
      if (data.code == -1) {
        this.app.toast(data.msg);
      } else {
        this.data = data.data;

      }
      console.log(data);
    }, true)
  }

  onDetail(index) {

    var params = { depositId: this.data[index].id, remainNum: this.data[index].num, receiveNum: (this.data[index].goodsNum - this.data[index].num) };

    this.navCtrl.push('DepositDetailPage', params);
  }

  addOrder() {
    this.navCtrl.push('DepositScanPage', {
      animation: 'md-transition'
    });
  }



}
