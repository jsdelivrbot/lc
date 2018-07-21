import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams  } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the OrderModifyPageOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-modify-page-one',
  templateUrl: 'order-modify-page-one.html',
})
export class OrderModifyPageOnePage {

  public goods:Array<any>;
  public present:Array<any>;
  public goodsLength:number=0;
  public presentLength:number=0;
  public lipinlength:number=0;
  public lipin:Array<any>;
  public ids;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public appservice:AppService,
     public platform:Platform) {
  }

  ionViewDidLoad() {
    this.appservice.getItem('order',data=>{
      console.log(data)
      this.ids=data['data']['ids']||[];
      this.goods=data['data']['goods']||[];
      this.present=data['data']['gifts']||[];
      this.lipin=data['data']['presentMap']||[];
      this.lipinlength=this.lipin.length||0;
      this.goodsLength=this.goods.length||0;
      this.presentLength=data['data'].gifts.length||0;
    });
   //返回提示
  
    console.log(this.goods)
    console.log('ionViewDidLoad OrderModifyPageOnePage');
  }
  OrderScanner(){
    console.log(this.navParams.get('phone'))
    this.navCtrl.push('OrderScannerPage',{ids:this.ids,phone:this.navParams.get('phone')},{
      animation: 'md-transition'
    })
  }

}
