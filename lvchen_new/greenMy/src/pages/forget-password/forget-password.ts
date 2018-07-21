import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service'
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  securityCodeTime = 0;

  constructor( 
  	public navCtrl: NavController,
    public navParams: NavParams,
    private apps: AppService) {
  }

  submit(value:any){

    var _father = this;

    if (value.phone.length != 11) {
      this.apps.alert('请输入正确的手机号码！');
      return;
    }else if (!value.password) {
      this.apps.alert('请输入密码！');
      return;
    }else if (!value.code) {
      this.apps.alert('请输入验证码！');
      return;
    }

    const param = {'phone':value.phone,'password':value.password,
    'newPassword':value.password,'smsCode':value.code};

    this.apps.httpPost('forgetPassword.api',param,data => {
      if (data.code == -1) {
         _father.apps.toast(data.msg);
      }else{
      	_father.apps.toast("操作成功！");
        _father.navCtrl.pop();
      }
    },true);

  }

  sendCode(phone:any){
    
    if (this.securityCodeTime > 0 ) {
      return;
    }

    var _father=this;

    if (phone.length != 11) {
      this.apps.alert('请输入正确的手机号码！');
      return;
    }


    this.apps.httpPost('getUserPhone.api',{'phone':phone},data=>{
      if(data.code==-1){
        this.apps.toast(data.msg)
      }else{
        this.apps.httpPost('get_phone_code.api',{'phone':phone,'code':'2'},data => {
          console.log(data);
          if (data.code == -1) {
             _father.apps.toast(data.msg);
          }else{
            _father.securityCodeTime = 60;
            var interval = setInterval(()=> {
              _father.securityCodeTime -= 1;
              if (_father.securityCodeTime == 0) {
                  clearInterval(interval);
              }
            },1000);
          }
        },true); 
      }
    },true)
             

  }

}
