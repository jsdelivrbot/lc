import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,Events} from 'ionic-angular';
import { AppService } from '../../providers/service-public-service/service-public-service'
import { Keyboard } from '@ionic-native/keyboard';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { App } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Navbar)navbar:Navbar;
  driverToken = '';

  securityCodeTime = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appService: AppService,
    private platform: Platform,
    private event: Events,
    private keyboard: Keyboard,
    public app:App) {

     
  }
  ionViewDidLoad() {

    this.appService.getItem('driverToken',(val) => {
      if(val==1){
       this.driverToken = '';
      }else{
       this.driverToken = val;
      }
    });

    this.appService.getItem('userInfo',(val) => {
      console.log(val);
      if (val && val!=1) {
        this.appService.getItem('loginInfo',(val) => {
          this.login(val);
        }); 
      }
    }); 

    this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
   
    this.platform.registerBackButtonAction(() => {
    });

    this.navCtrl.swipeBackEnabled=false;
   
  }

 
  login(value:any){

    if (value.phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }else if (!value.password) {
      this.appService.alert('请输入密码！');
      return;
    }

    var param = {'phone': value.phone,'password':value.password};
 
    if (!this.driverToken) {
      if (!value.code) {
        this.appService.alert('请输入验证码！');
        return;
      }
      param['smsCode'] = value.code;
    }else{
      param['driverToken'] = this.driverToken;
    }
   
    this.appService.httpPost('login_submit.api',param,data => {
      if (data.code == -1) {
         this.appService.toast(data.msg);
      }else{
        this.appService.setItem('driverToken',data.map.driverToken);
        this.appService.setItem('userInfo',data.map);
        let keyV = {
          'phone': value.phone,
          'password': value.password,
          'driverToken': data.map.driverToken
        };
        this.appService.setItem('user', keyV);
        this.navCtrl.setRoot('TabsPage')
      }
    },true);
   

  }

  sendCode(phone:any){
    console.log(phone)
    if (this.securityCodeTime > 0 ) {
      return;
    }

    var _father=this;

    if (phone.length != 11) {
      this.appService.alert('请输入正确的手机号码！');
      return;
    }

    this.appService.httpPost('getUserPhone.api',{'phone':phone},data=>{
      if(data.code==-1){
        this.appService.toast(data.msg)
      }else{
        this.appService.httpPost('get_phone_code.api',{'phone':phone,'code':3},data => {
          if (data.code == -1) {
             _father.appService.toast(data.msg);
          }else{
            _father.securityCodeTime = 60;
            var interval = setInterval(()=> {
              _father.securityCodeTime -= 1;
              if (_father.securityCodeTime <= 0) {
                  clearInterval(interval);
              }
            },1000);
          }
        },true);
      }
    },true)
             

  }

  forgetPassword() {
    this.navCtrl.push('ForgetPasswordPage');
  }

}
