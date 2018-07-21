import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the CustomerReturnSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-return-success',
  templateUrl: 'customer-return-success.html',
})
export class CustomerReturnSuccessPage {
  public returnStoreInfo=''
  public returnStoreInfoGoods:Array<any>=[];
  public returnStoreInfoPresentMap:Array<any>=[];
  public phone='';
  public posSaleIds = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popover:PopoverController) {
  
  }

  ionViewDidLoad() {
    this.phone=this.navParams.get('phone')
    this.returnStoreInfo=this.navParams.get('data');
    this.posSaleIds=this.returnStoreInfo['posSaleIds'];
    this.returnStoreInfoGoods=this.returnStoreInfo['goods'];
    this.returnStoreInfoPresentMap=this.returnStoreInfo['gifts'];
  }
  commoditySuccess(){
    this.navCtrl.push('CustomerInfoPage',{phone:this.phone,posSaleIds:this.posSaleIds},{ animation: 'md-transition' })
  }
  codeScan(code){
    const ary=[];
    ary.push(code)
    let popover=this.popover.create('CodeviewPage',ary)
    popover.present();
  }

}
