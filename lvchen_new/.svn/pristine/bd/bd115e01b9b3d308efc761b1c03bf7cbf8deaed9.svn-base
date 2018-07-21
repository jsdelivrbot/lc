import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ChargebackVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chargeback-verify',
  templateUrl: 'chargeback-verify.html',
})
export class ChargebackVerifyPage {
  
  @ViewChild(Navbar)navbar:Navbar;

  phone;

  smsCode = '';

  memo = '';

  smsCodeTime = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apps: AppService,
    public storage: Storage) {

  }
  
  ngOnInit() {  
   
    this.phone = this.navParams.get('phone');

    this.sendCode();
  }
  // ionViewDidLoad(){
  //   this.navbar.backButtonClick=()=>{
  //     this.navCtrl.pop({ animation: 'md-transition' })
  //   }
  // }
  submit() {
      console.log(this.phone)
    if (!this.smsCode) {
      this.apps.alert('请输入验证码！');
      return;
    }
    this.apps.httpPost('checkInSalesOrderGoods.api',{
      'depositId': this.navParams.get('depositId'),
      'phone':this.phone,
      'smsCode': this.smsCode,
      'memo': this.memo,
      'resultObject':JSON.stringify(this.navParams.get('data'))
    },data => {
      console.log(data);
      if (data.code == -1) {
        this.apps.toast(data.msg);
      }else{
      	this.apps.toast(data.msg);
        this.navCtrl.popToRoot();
      }

    },true);

  }

  sendCode(){
    
    if (this.smsCodeTime > 0 ) {
      return;
    }

    var _father=this;

   
    this.apps.httpPost('get_phone_code.api',{
      'phone':this.phone,
      'code':'4'}
    ,data => {
      console.log(data);
      if (data.code == -1) {
         _father.apps.toast(data.msg);
      }else{
        _father.smsCodeTime = 60;
        var interval = setInterval(()=> {
          _father.smsCodeTime -= 1;
          if (_father.smsCodeTime == 0) {
              clearInterval(interval);
          }
        },1000);
      }
    },true);           

  }
}
