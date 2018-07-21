import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ConsignOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consign-order-detail',
  templateUrl: 'consign-order-detail.html',
})
export class ConsignOrderDetailPage {
   // 本身的storeId
   public storeId:any;
   //总量总数
   public goodsNum: number;
   //余量总数
   public surplus: number;
   //orgStoreName业务组名称
   public orgStoreName: string;
   //数据
   public data = [];
    //月份
    public month;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public appService:AppService) {
    this.appService.getItem('curStore',val=>{
      this.storeId=val['id']
      // console.log(this.storeId)
    })

    this.month = navParams.get('month');

  }

  consignOrderDetail(){
    this.appService.httpPost('findMamDepositNo.api',{storeId: this.storeId, month: this.month},data=>{
      this.goodsNum = data['goodsNum'];
      this.surplus = data['surplus'];
      this.data = data['data'];
            
    })
  }

  ionViewDidLoad() {
    this.consignOrderDetail();
    console.log(this.month);
  }

}
