import { Component,ViewChild } from '@angular/core';
import { IonicPage, Navbar,NavController, NavParams,PopoverController,ViewController,Platform} from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the DepositCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-check',
  templateUrl: 'deposit-check.html',
})
export class DepositCheckPage {

  @ViewChild(Navbar)navbar:Navbar;
  data;
  presents = new Array();
  actNum = 0;
  giftNum = 0;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public appService: AppService,
     public popoverCtrl: PopoverController,   
    public viewCtrl: ViewController,
    public platform : Platform
) {
  
  }

  ngOnInit() {

    this.navbar.backButtonClick = (e:UIEvent)=>{
      this.onBack();
    }

    this.data = this.navParams.get('data');

    this.actNum = this.data.actMap.length;

    this.giftNum = this.data.gifts.length;

  }

  ionViewDidEnter(){
    this.platform.registerBackButtonAction(() => {
      this.onBack();
    });
  }


  onBack(){
    this.appService.backAlert(this.viewCtrl);
  }

  onScanner(){
    this.navCtrl.pop();
  }
 
  saleVerify() {

    var resultObect = new Array();

    for (var i = 0; i < this.data.goods.length; ++i) {
      var good = this.data.goods[i];
      resultObect.push({"id": good.goodsId,"actId":good.actId,"saleType":"0","num":good.num});
    }

    for (var j = 0; j < this.data.gifts.length; ++j) {
      var gifts = this.data.gifts[j];
      resultObect.push({"id": gifts.goodsId,"actId":gifts.actId,"saleType":"1","num":gifts.num});
    }

    console.log(resultObect);

    let params = {data:resultObect};
    
    this.navCtrl.push('DepositVerifyPage',params,{
      animation: 'md-transition'
    });
    
  }
}
