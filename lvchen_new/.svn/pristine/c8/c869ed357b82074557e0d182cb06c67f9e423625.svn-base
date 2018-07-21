import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ReceiveVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-verify',
  templateUrl: 'receive-verify.html',
})
export class ReceiveVerifyPage {
  @ViewChild(Navbar)navbar:Navbar;
  
  data;

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
    this.phone = this.navParams.get('phone');
    this.sendCode();
  }

  submit() {
   
    if (!this.smsCode) {
      this.appService.alert('请输入验证码！');
      return;
    }
    
    this.appService.httpPost('submitCheckInOrderGoods.api',
    {
      'smsCode': this.smsCode,
      'depositId': this.navParams.get('depostId'),
      'memo':this.memo,
      'resultObject':JSON.stringify(this.data),
      'phone':this.phone
    }
    ,data => {
      console.log(data);
      if (data.code == -1) {
        this.appService.toast(data.msg);
      }else{
        this.navCtrl.push('ReceiveSuccessPage',data);
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
        _father.smsCodeTime = 120;
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