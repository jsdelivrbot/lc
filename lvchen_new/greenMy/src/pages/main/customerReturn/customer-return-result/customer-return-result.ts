import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the CustomerReturnResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-return-result',
  templateUrl: 'customer-return-result.html',
})
export class CustomerReturnResultPage {
  @ViewChild(Navbar)navbar:Navbar;
  public storeName:string;
  public ReturnReceipt:string;
  public customerPhone:string;
  public goods:Array<any>;
  public gift:Array<any>;
  public Remark='';
  public code:Array<any>;
  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService: AppService,
    public popover:PopoverController) {
      var key=this.navParams.get('item')
      this.ReturnReceipt=key.receiptNo;
      this.customerPhone=key.phone;
      this.goods=key.goods;
      this.gift=key.gifts;
  }
  ionViewDidLoad() {
      //返回提示
      this.navbar.backButtonClick = (e:UIEvent)=>{
       
          this.navCtrl.popToRoot({ animation: 'md-transition' });
       
      }
    console.log('ionViewDidLoad CustomerReturnResultPage');
  }
  codeScan(code){
    console.log(code)
    let ary:Array<string>=[];
    ary.push(code);
    let popver=this.popover.create('CodeviewPage',ary);
    popver.present()
  }

}
