import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the ConsignRemainderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consign-remainder-detail',
  templateUrl: 'consign-remainder-detail.html',
})
export class ConsignRemainderDetailPage {

  public storeId;
  public month;
  //商品总数
  public commodity;
  //赠品数
  public gift;
  //余量数据remainderData
  public remainderData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService:AppService) {
    this.appService.getItem('curStore',val=>{
      this.storeId=val['id']
      // console.log(this.storeId)
    });
    this.month = navParams.get('month');
  }

  ionViewDidLoad() {
    this.consignRemainder();
  }

  consignRemainder(){
    this.appService.httpPost('findMamDepositSurplus.api',{storeId: this.storeId, month: this.month},data=>{
      console.log(data['data']);
      this.remainderData = data['data'];
      this.gift = data['gift'];
      this.commodity = data['commodity'];
    })
  }

}
