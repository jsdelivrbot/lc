import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the OrderModifyPageTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-modify-page-two',
  templateUrl: 'order-modify-page-two.html',
})
export class OrderModifyPageTwoPage {
  @ViewChild(Navbar)navbar:Navbar;
  data;

  phone = '';

  smsCode = '';

  memo = '';

  smsCodeTime = 0;
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
    public appservice:AppService,
    public popover:PopoverController,
    public alertCtrl:AlertController,
    private keyboard: Keyboard) {
      this.keyboard.show();
      this.phone = navParams.get('phone');
      console.log(this.phone)
      this.appservice.getItem('orderList',val=>{
        console.log(val)
        this.actName=val['actMap']||[];
        this.actId=val['actIds']||[];
        this.actNameNum=this.actName.length||0;
        this.goods=val['goods']||[];
        this.goodsLength=this.goods.length||0;
        this.present=val['gifts']||[];
        this.presentLength=this.present.length||0;
        this.lipin=val['presentMap']||[];
        this.lipinlength=this.lipin.length||0;
        this.pres=val['presentMap']||[];
        this.ids=val['ids'].replace(/\"/gi,'');
      })
  }

  ionViewDidLoad() {
    this.navbar.backButtonClick = (e:UIEvent)=>{
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '您的操作未完成，确定要退出？',
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.navCtrl.popToRoot()
            }
          },
          {
            text: '取消',
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
    }
  }
  codeScan(id){
   
    let popover=this.popover.create('CodeviewPage',id);
    popover.present();
  }
  OrderScanner(){
    this.navCtrl.pop();
  }
  submit(){
   
    if(!/\d{6}/.test(this.smsCode)){
      this.appservice.alert('验证码有误差');
      return;
    }
    var goodsAry=[];
    for(var i=0;i<this.goods.length;i++){
      goodsAry.push({goodsId:this.goods[i].goodsId,code:this.goods[i].code,saleType:0,actId:this.goods[i]['actId']})
    }
    var gifts=[];
    for(var j=0;j<this.present.length;j++){
      gifts.push({goodsId:this.present[j].goodsId,code:this.present[j].code,actId:this.present[j].actId,saleType:1})
    }
    var pres=[];
    if(this.pres.length>=1){
      for(var k=0;k<this.pres.length;k++){
        pres.push({goodsId:this.pres[k]['goodsId'],num:this.pres[k].num})
      }
    }
    var resultObject={
      goods:goodsAry.concat(gifts),
      gifts:pres,
      actId:this.actId
    }
    console.log(resultObject)
    this.appservice.httpPost('submitChengeCasPosSaleOrder.api',
      {
      phone:this.phone,
      smsCode:this.smsCode,
      ids:this.ids,
      resultObject:JSON.stringify(resultObject)
    },data=>{
      console.log(data)
        if(data.code==1){
          this.appservice.setItem('orderT',data.data)
          this.navCtrl.push('OrderModifyPageThreePage',{
            animation: 'md-transition'
          })
        }else{
          this.appservice.toast(data.msg)
        }
    },true)
  }
  sendCode(){
    
    if (this.smsCodeTime > 0 ) {
      return;
    }

    var _father=this;

    this.appservice.httpPost('get_phone_code.api',
      {
        'phone':this.phone,
        'code':'4'
      },data => {
      console.log(data);
      if (data.code == -1) {
         _father.appservice.toast(data.msg);
      }else{
        _father.smsCodeTime = 60;
        var interval = setInterval(()=> {
          _father.smsCodeTime -= 1;
          if (_father.smsCodeTime <= 0) {
              clearInterval(interval);
          }
        },1000);
      }
    },true);           

  }

}
