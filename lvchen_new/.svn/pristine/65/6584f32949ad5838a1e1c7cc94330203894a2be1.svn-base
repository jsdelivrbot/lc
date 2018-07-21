import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Events, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppService } from '../providers/service-public-service/service-public-service';
import { Keyboard } from '@ionic-native/keyboard';
import { Nav } from 'ionic-angular';
import { NativeService } from '../providers/NativeService';

@Component({
  templateUrl: 'app.html'
})
export class MyApp  {
  @ViewChild('myNav') nav: Nav;
  constructor(
    public ionicApp: IonicApp,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    protected appService: AppService,
    protected keyboard: Keyboard,
    private alertCtrl: AlertController,
    private events: Events,
    public nativeService:NativeService,
  ) {
    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#ffffff');
      splashScreen.hide();
      this.keyboard.hideKeyboardAccessoryBar(false);
      // 注册安卓返回键
      this.keyboard.disableScroll(true);
      this.registerBackButtonAction()
      
      // 重新登陆
      this.appService.getItem('userInfo',(val) => {
        if(val&&val==1){
          this.nav.setRoot('LoginPage');
          this.registerBackButtonAction(); // 注册android返回按键事件
          return;
        };
        if (val&&val!=1) {
          var obj=null;
          let user= this.appService.getItem('user',val=>{
            obj =val
           })
          this.appService.httpPost('login_submit.api',obj,data => {
            console.log(data);
            if (data.code == -1) {
               this.appService.toast(data.msg);
               this.nav.setRoot('LoginPage')
               this.registerBackButtonAction(); // 注册android返回按键事件

            }else{
              this.appService.setItem('driverToken',data.map.driverToken);
              this.appService.setItem('userInfo',data.map);
              this.nav.setRoot('TabsPage')
              this.registerBackButtonAction(); // 注册android返回按键事件

            }
          });
         
        }else{
          this.nav.setRoot('LoginPage')
        }
      });
    });

  }
  registerBackButtonAction() {
    this.keyboard.close();
     this.platform.registerBackButtonAction(() => {
       this.events.publish('android:backButtonAction');
       // 如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
       // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
       const activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
         console.log(activePortal)
       if (activePortal) {
         activePortal.dismiss();
         return;
       }
       const childNav = this.nav.getActiveChildNavs()[0]; // 获取tabs导航,this.nav是总导航,tabs是子导航
       if (!childNav) {
         this.nativeService.minimize();
         return;
       }
       const tab = childNav.getSelected(); // 获取选中的tab
       const activeVC = tab.getActive(); // 通过当前选中的tab获取ViewController
       const activeNav = activeVC.getNav(); // 通过当前视图的ViewController获取的NavController
       return activeNav.canGoBack() ? activeNav.pop() : this.nativeService.minimize();
     }, 1);
   }
}
