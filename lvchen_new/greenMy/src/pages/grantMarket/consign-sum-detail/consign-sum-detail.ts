import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ConsignSumDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consign-sum-detail',
  templateUrl: 'consign-sum-detail.html',
})
export class ConsignSumDetailPage {
  // 本身的storeId
  public storeId:any;
  //月份
  public month;
  // 总数数据
  public sumData = [];

  //商品总数
  public commodity;
  //赠品数
  public gift;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public appService:AppService) {
    this.appService.getItem('curStore',val=>{
      this.storeId=val['id']
      // console.log(this.storeId)
    });
    this.month = navParams.get('month');


  }

  ionViewDidLoad() {
    this.consignSum();
  }

  consignSum(){
    this.appService.httpPost('findMamDepositGoods.api',{storeId: this.storeId,month: this.month},data=>{
      console.log(data);
      this.sumData = data['data'];
      this.commodity = data['commodity'];
      this.gift = data['gift']

    })
  }
}
