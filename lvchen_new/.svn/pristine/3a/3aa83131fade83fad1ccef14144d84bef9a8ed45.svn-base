import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the DepositDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-detail',
  templateUrl: 'deposit-detail.html',
})
export class DepositDetailPage {
  acts;
  goods;
  gifts;
  phone;
  receiptNo;
  actNum;
  giftNum;
  depositId;
  remainNum;
  receiveNum;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public app:AppService,
     public platform:Platform ) {
  }

  ionViewDidLoad() {
    
  }

  ngOnInit() {
    
    this.remainNum = this.navParams.data.remainNum;

    this.receiveNum = this.navParams.data.receiveNum;

  	this.app.httpPost('getCheckInOrderGoods.api',this.navParams.data,data=>{
  		if (data.code == -1) {
  			    this.app.toast(data.msg);
        }else{
        	  this.acts = data.actMap;
          	this.goods = data.goodsMap;
        	  this.gifts = data.giftsMap;
            this.phone = data.phone;
            this.receiptNo = data.receiptNo;
            this.actNum = this.acts.length;
		        this.giftNum = this.gifts.length;
            this.depositId = data.posSaleId;
        }
        console.log(data);
    },true);
  }



  onReceive(){
    this.navCtrl.push('ReceiveScanPage',{depostId:this.depositId,phone:this.phone});
  }

  onChargeback(){
    let params = {goods:this.goods,gifts:this.gifts,phone:this.phone,receiptNo:this.receiptNo,depositId:this.depositId};
    this.navCtrl.push('ChargebackCheckPage',params);
  }

  getReceiveDel(){
    this.navCtrl.push('ReceiveDetailPage',this.navParams.data);
  }
}
