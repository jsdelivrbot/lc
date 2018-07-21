import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SaleReturnDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-return-detail',
  templateUrl: 'sale-return-detail.html',
})
export class SaleReturnDetailPage {
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appservice:AppService,
    public alertCtrl:AlertController,
    public popover:PopoverController) {
  this.state=this.navParams.get('state')

  }
  
  ngOnInit(){
    this.navbar.backButtonClick = (e:UIEvent)=>{
      
      this.navCtrl.pop({ animation: 'md-transition' });

    }
    this.state=this.navParams.get('state');
    this.appservice.httpPost('getSellCasPosSale.api',
      {posSaleId:this.navParams.get('saleId')},data=>{
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
        console.log(this.goods)
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleReturnDetailPage');
  }
  // JSON.parse(window.localStorage.getItem('userInfo'))['id']
  saleReturnPass(id:number):void{
    var k=id==1?'退货通过':'退货不通过';
    let prompt = this.alertCtrl.create({
      title: `请确认${k}`,
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            this.appservice.httpPost('auditCasPosSale.api',
              {posSaleId:this.posSaleId,
              state:id,
              remarks:''
            },data=>{
              console.log(data)
                if(data.code==1){
                  this.appservice.alert(data.msg);
                  this.navCtrl.popToRoot();
                }else{
                  this.appservice.alert(data.msg)
                }
            })
          }
        }
      ]
    });
    prompt.present();
    
  }
  codeScan(code:any){
    const ary:Array<any>=[];
    ary.push(code);
    let popover=this.popover.create('CodeviewPage',ary);
    popover.present();
  }


}
