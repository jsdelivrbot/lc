import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  @ViewChild(Navbar)navbar:Navbar;
  public phone:string;
  public storeName:string;
  public receiptNo:string;
  public goods:Array<any>;
  public present:Array<any>;
  public actName:Array<any>;
  public actNameNum:number=0;
  public goodsLength:number=0;
  public presentLength:number=0;
  public state:number=0;
  public posSaleId='';
  public giftLength:number=0;
  public gifts:Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService,
    public alertCtrl:AlertController,
    public popover:PopoverController) {

  }
  
  ngOnInit(){
  
    this.state=this.navParams.get('state');
    this.appservice.httpPost('getOrderCasPosSale.api',
      {posSaleId:this.navParams.get('id')},data=>{
        // alert(JSON.stringify(data))
        console.log(data)
        this.posSaleId=data.data.posSaleId;
        this.phone=data.data.phone;
        this.storeName=data.data.stroeName;
        this.receiptNo=data.data.receiptNo;
        this.goods=data.data.goods;
        this.present=data.data.gifts;
        this.actName=data.data.actMap||[];
        this.actNameNum=this.actName.length||0;
        this.goodsLength=this.goods.length||0;
        this.presentLength=data.data.gifts.length||0;
        this.gifts=data.data['presentMap']||[];
        this.giftLength=this.gifts.length||0;
    },true)
    
  }
  codeScan(code:any){
   
    let popover=this.popover.create('CodeviewPage',code);
    popover.present();
  }

  add(){
    let ary=[this.posSaleId];
    this.navCtrl.push('OrderScannerPage',{ids:JSON.stringify(ary),phone:this.phone},{
      animation: 'md-transition'
    })
  }

}
