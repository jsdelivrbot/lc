import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the OrderModifyPageThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-modify-page-three',
  templateUrl: 'order-modify-page-three.html',
})
export class OrderModifyPageThreePage {
  @ViewChild(Navbar)navbar:Navbar
  public phone:any;
  public receiptNo:any;
  // 活动
  public actNameNum:number=1
  public actName:Array<any>;
  // 商品
  public goodsLength:number=1
  public goods:Array<any>;
  // 赠品
  public presentLength:number=1
  public present:Array<any>;
  public ids:string;
  public pres;
  public actId:Array<number>;
  protected lipinlength:number=0;
  protected lipin:Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover:PopoverController,
    public appservice:AppService,
    public popoverCtrl:PopoverController) {
     
      this.appservice.getItem('orderT',val=>{
        this.phone=val['phone']||'';
        this.receiptNo=val['receiptNo']||'';
        this.actName=val['actMap']||[];
        this.actNameNum=this.actName.length||0;
        this.goods=val['goods']||[];
        this.goodsLength=this.goods.length||0;
        this.present=val['gifts']||[];
        this.presentLength=this.present.length||0;
        // this.actId=val['actIds']||[];
        this.lipin=val['presentMap']||[];
        this.lipinlength=this.lipin.length||0;
        this.pres=val['presentMap']||[];
        // this.ids=val['ids'].replace(/\"/gi,'');
      })
     
  }
  ngOnInit(){
    this.navbar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.popToRoot({ animation: 'md-transition' });
    }
  }
  codeScan(code){
    let popover = this.popoverCtrl.create('CodeviewPage',code);
    popover.present();
  }

}
