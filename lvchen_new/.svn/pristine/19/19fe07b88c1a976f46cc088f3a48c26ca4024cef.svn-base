import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the DepositVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-verify',
  templateUrl: 'deposit-verify.html',
})
export class DepositVerifyPage {
  @ViewChild(Navbar)navbar:Navbar;

  data;

  name = '';
  
  phone = '';

  smsCode = '';

  memo = '';

  smsCodeTime = 0;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public appService: AppService) {
  }
  
  ngOnInit() {  
    this.data = this.navParams.get('data');
   
  }


  verify(){
    if (!this.phone || this.phone.toString().length != 11) {
      return;
    }
    this.appService.httpPost('getMemberName.api',{
      'phone':this.phone
    },data => {
      if (data.code == -1) {
        // code...
      }else{
        this.name = data.map.name;
      }
      
    },true);
  }

  submit() {
    
    if (!this.name) {
      this.appService.alert('请输入姓名！');
      return;
    }

    if (!this.phone) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }

    if (!this.smsCode) {
      this.appService.alert('请输入验证码！');
      return;
    }

    console.log(
      {
        userId:JSON.parse(window.localStorage.getItem('userInfo'))['id'],
        storeId:JSON.parse(window.localStorage.getItem('curStore'))['id'],
        'phone':this.phone,
        'smsCode': this.smsCode,
        'memo':this.memo,
        'resultObject':JSON.stringify(this.data)
      }
    )
    this.appService.httpPost('checkInReceiptOrderGoods.api',{
      'phone':this.phone,
      'smsCode': this.smsCode,
      'memo':this.memo,
      'name':this.name,
      'resultObject':JSON.stringify(this.data)
    }    
    ,data => {
      console.log(data);
      if (data.code == -1) {
        this.appService.toast(data.msg);
      }else{
        this.navCtrl.push('DepositSuccessPage',data.data);
      }

    },true);

  }

  sendCode(){
    
    if (this.smsCodeTime > 0 ) {
      return;
    }

    var _father=this;

    if (this.phone.toString().length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }

    this.appService.httpPost('get_phone_code.api',
      {
        'phone':this.phone,
        'code':'4'
      }
    ,data => {
      console.log(data);
      if (data.code == -1) {
         _father.appService.toast(data.msg);
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
