import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
/**
 * Generated class for the DepositSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-success',
  templateUrl: 'deposit-success.html',
})
export class DepositSuccessPage {
  public data;
  public actMap:Array<any>=[];
  public actMapLength;
  public goods:Array<any>=[];
  public goodsLength;
  public gifts:Array<any>=[];
  public giftsLength;
  public receiptNo;
  public phone;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform) {
  }

  ionViewWillEnter() {
    this.data = this.navParams.data;
    this.receiptNo=this.data['receiptNo']||'';
    this.phone=this.data['phone']||'';
    this.actMap=this.data['actMap']||[];
    this.actMapLength=this.actMap.length||0;
    this.goods=this.data['goods']||[];
    this.goodsLength=this.goods.length||0;
    this.gifts=this.data['gifts']||[];
    this.giftsLength=this.gifts.length||0;
  }



  ionViewDidLoad() {
   
  }

  onBack(){
    this.navCtrl.popToRoot();
  }

  onReceive(){
    this.navCtrl.push('ReceiveScanPage',{depostId:this.data.posSaleId,phone:this.data.phone});
  }
}
