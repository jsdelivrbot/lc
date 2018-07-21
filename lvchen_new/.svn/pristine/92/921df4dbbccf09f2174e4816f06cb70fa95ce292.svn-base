/**
 * @author() linyunfu
 * lazy
 * */ 
import { Component,ViewChild } from '@angular/core';
import { IonicPage,Platform, Navbar,NavController,ViewController, NavParams,PopoverController } from 'ionic-angular';
// import { SaleVerifyPage } from '../sale-verify/sale-verify';
// import { ScangiftPage } from '../scangift/scangift';
// import { CodeviewPage } from '../codeview/codeview';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {
  @ViewChild(Navbar)navbar:Navbar;
  // 储存 扫码过来的数据
  data;
  protected gifts = new Array();
  protected goods = new Array();
  protected presents = new Array();
  public actIds;
  public userId;
  public storeId;
  public actNum = 0;
  public giftNum = 0;
  public presentNum = 0;
  public selectOptions;
  public actMaps:Array<any>;
  public actMapLength:number;
  public Goods:Array<any>;
  public GoodsLength:number;
  public Gifts:Array<any>;
  public GiftsLength:number;
  // 来源
  public sourceMap:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public appService: AppService,
    public popoverCtrl: PopoverController,
    public viewCtrl:ViewController,
    public platform:Platform) {
  }
  ionViewWillEnter(){
    this.selectOptions = {title: '选择来源',mode: 'md'};
    this.Gifts=new Array();
    this.navbar.backButtonClick = (e:UIEvent)=>{
    this.onBack();
 }
 var val=this.navParams.get('scannerData');
// 获取上一个页面过来的数据 采用本地储存的方式
  this.sourceMap=val['sourceMap']||{};
  this.actIds= val['actIds']
  this.actMaps=val['actMap']||[];
  this.actMapLength=this.actMaps.length||0;
  this.Goods=val['goods']||[];
  this.GoodsLength=this.Goods.length||0;
  this.Gifts=val['gifts']||[];
  this.GiftsLength=this.Gifts.length||0;
  this.goods=val['goods'];
  this.gifts=val['gifts'];
  // 储存
  this.appService.getItem('pre',val=>{
    this.presents=val['presentMap']||[];
    this.presentNum=this.presents.length||0;
  })
  // 扫描显示数量
  this.actNum = this.actMapLength;
  this.giftNum = this.GiftsLength;
   
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
    this.platform.registerBackButtonAction(() => {
      this.onBack();
    });
  }

  ionViewDidLeave(){  
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
  }  
  
  onBack(){
    this.appService.backAlert(this.viewCtrl);
  }
  onScanner(){
    this.navCtrl.pop();
  }

// 销售第一次扫码-》销售-》礼品扫码
  onScanPresent(){

    this.navCtrl.push('ScangiftPage');
  }

  //查看积分码 
  onCodeView(codes){
    let popover = this.popoverCtrl.create('CodeviewPage',codes);
    popover.present();
  }
  
  //查看积分码 
  onCodeSourceView(codes){
    let popover = this.popoverCtrl.create('CodeviewPage',codes);
    popover.present();
  }
// 　处理销售逻辑
  saleVerify() {
    // 处理商品
    const goods:Array<any>=[]
    for(let item of this.goods){
        goods.push({id:item['goodsId'],"source":'',actId:item['actId'],code:item.code,"saleType":"0"})
    }
    const gifts:Array<any>=[]
    for(let item of this.gifts){
        gifts.push({id:item['goodsId'],"source":'',actId:item['actId'],code:item.code,"saleType":"1"})
    }
    var resultObect = {'actIds':this.actIds,'goods':goods.concat(gifts),'gifts':this.presents,sourceMap:this.sourceMap};
    console.log( resultObect)
    let params = 
    {
      data:resultObect,
      userId:JSON.parse(window.localStorage.getItem('userInfo'))['id'],
      storeId:JSON.parse(window.localStorage.getItem('curStore'))['id'],
      type:this.gifts.length>0?'1':'2'
    }
    this.navCtrl.push('SaleVerifyPage',params,{
      animation: 'md-transition'
    });
    
  }

  onAddNum(pos,num){
   this.presents[pos].num = parseInt(num) + 1;
  }

  onCutNum(pos,num){
    if (num == 1) {
       this.presents.splice(pos,1);
    }else{
      this.presents[pos].num =  parseInt(num) - 1;
    }
    
  }
}
