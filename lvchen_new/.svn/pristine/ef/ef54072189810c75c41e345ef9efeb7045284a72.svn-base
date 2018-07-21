import { Component,ViewChild } from '@angular/core';
import { IonicPage, Navbar,Platform,NavController,ViewController, NavParams,PopoverController } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the ReceiveCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-check',
  templateUrl: 'receive-check.html',
})
export class ReceiveCheckPage {
 @ViewChild(Navbar)navbar:Navbar;
  gifts = new Array();
  goods = new Array();
  presents = new Array();
  goodNum = 0;
  giftNum = 0;
  presentNum = 0;
  selectOptions;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public appService: AppService,
     public popoverCtrl: PopoverController,
     public viewCtrl:ViewController,
     public platform : Platform) {
  
  }

  ionViewWillEnter()  {
    this.gifts = new Array();
    this.goods = new Array();
    this.presents = new Array();
    this.appService.getItem('pre',val=>{
      this.presents=val['presentMap']||[];
      this.presentNum=this.presents.length||0;
    })
   
    this.selectOptions = {title: '选择来源',mode: 'md'};

    this.navbar.backButtonClick = (e:UIEvent)=>{
      this.onBack();
    }

    var tempGoods = this.navParams.get('goods');
    for (var i = 0; i < tempGoods.length; ++i) {
    	var tempGood = tempGoods[i];
    	let isRepeat = false;
    	for (var j = 0; j < this.goods.length; ++j) {
    		if (this.goods[j].id == tempGood.goodsId) {
    			this.goods[j].code.push(tempGood.code);
    			this.goods[j].num += 1; 
    			isRepeat = true;
    			break;
    		}
    	}
    	if (!isRepeat) {
	    	let codes = new Array();
	    	codes.push(tempGood.code);
	    	this.goods.push({id:tempGood.goodsId,code:codes,saleType:0,source:'',name:tempGood.name,num:1});
    	}
    }

    var tempGifts = this.navParams.get('gifts');
    for (var k = 0; k < tempGifts.length; ++k) {
    	var tempGift = tempGifts[k];
    	let isRepeat = false;
    	for (var l = 0; l < this.gifts.length; ++l) {
    		if (this.gifts[l].id == tempGift.goodsId) {
    			this.gifts[l].code.push(tempGift.code);
    			this.gifts[l].num += 1; 
    			isRepeat = true;
    			break;
    		}
    	}
    	if (!isRepeat) {
	    	let codes = new Array();
	    	codes.push(tempGift.code);
	    	this.gifts.push({id:tempGift.goodsId,code:codes,saleType:1,source:tempGift.source,name:tempGift.name,num:1});
    	}
    	
    }

    this.giftNum = this.gifts.length;

    this.goodNum = this.goods.length;
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

  onScanPresent(){
    this.navCtrl.push('ScangiftPage',{ userId:this.navParams.get('userId') });
  }


  
  onCodeView(codes){
    let popover = this.popoverCtrl.create('CodeviewPage',codes);
    popover.present();
  }
  
 
  saleVerify() {

    var tempGoods = new Array();

    for (var i = 0; i < this.goods.length; ++i) {
      tempGoods.push( this.goods[i]);
    }

    for (var j = 0; j < this.gifts.length; ++j) {
      tempGoods.push( this.gifts[j]);
    }

    let params = {data:{'goods':tempGoods,'gifts':this.presents},
    	depostId:this.navParams.get('depostId'),
      phone:this.navParams.get('phone')};
    
    this.navCtrl.push('ReceiveVerifyPage',params,{
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
