import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AppService, AppGlobal } from '../providers/service-public-service/service-public-service'
import { ReactiveFormsModule } from '@angular/forms';
import { ParamsPublic } from '../publics/public';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { NativeService } from '../providers/NativeService';




// import { Md5 } from 'ts-md5/dist/md5';
@NgModule({
  declarations: [
    MyApp,   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true', //隐藏全部子页面tabs
      backButtonText: '',
      ReactiveFormsModule,
      platform: {
        ios: {
          scrollPadding: false,
          scrollAssist: false,
          autoFocusAssist: false
        },
        android: {
          scrollPadding: true,
          scrollAssist: true,
          autoFocusAssist: true
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    HttpModule,
    AppService,
    ParamsPublic,
    AppGlobal,
    Keyboard,
    Camera,
    NativeService,
    AppMinimize,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

  ]
})
export class AppModule { }
