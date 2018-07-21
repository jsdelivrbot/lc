import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the ChargebackCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chargeback-check',
  templateUrl: 'chargeback-check.html',
})
export class ChargebackCheckPage {
  goods;
  gifts;
  phone;
  receiptNo;
  goodNum = 0;
  giftNum = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:AppService) {
  }

  ngOnInit(){
  	this.goods = this.navParams.get('goods');
  	this.gifts = this.navParams.get('gifts');
  	this.phone = this.navParams.get('phone');
  	this.receiptNo = this.navParams.get('receiptNo');

  	for (var i = 0; i < this.goods.length; ++i) {
  		this.goods[i].quitNum = 0;
  		this.goodNum += parseInt(this.goods[i].num);
  	}

  	for (var j = 0; j < this.gifts.length; ++j) {
  		this.gifts[j].quitNum = 0;
  		this.giftNum += parseInt(this.gifts[j].num);
  	}
  }

  onAddNum(type,pos){
  	if (type == 1) {
  		if (this.goods[pos].quitNum == this.goods[pos].num) {
  			return;
  		}else{
  			this.goods[pos].quitNum +=1;
  		}
  		
  	}else{
  		if (this.gifts[pos].quitNum == this.gifts[pos].num) {
  			return;
  		}else{
  			this.gifts[pos].quitNum +=1;
  		}
  	}
  }

  onCutNum(type,pos){
  	if (type == 1) {
  		if (this.goods[pos].quitNum == 0) {
  			return;
  		}else{
  			this.goods[pos].quitNum -=1;
  		}
  		
  	}else{
  		if (this.gifts[pos].quitNum == 0) {
  			return;
  		}else{
  			this.gifts[pos].quitNum -=1;
  		}
  	}
  }

  goBack(){
  	this.navCtrl.pop();
  }

  goVerify() {

    var result = new Array();

    for (var i = 0; i < this.goods.length; ++i) {
      var good = this.goods[i];
      if (good.quitNum >0) {
      	result.push({"id": good.id,"num":good.quitNum});
      }
    }

    for (var j = 0; j < this.gifts.length; ++j) {
       var gift = this.gifts[j];
      if (gift.quitNum >0) {
      	result.push({"id": gift.id,"num":gift.quitNum});
      }
    }

    if (result.length == 0) {
    	this.app.toast('退单数量为0，无法提交');
    	return;
    }
    console.log(result);

    let params = {data:result,depositId: this.navParams.get('depositId'),phone:this.phone};
    this.navCtrl.push('ChargebackVerifyPage',params,{
      animation: 'md-transition'
    });
    
  }
}
