import {Injectable} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
// import {AppVersion} from '@ionic-native/app-version';
// import {File} from '@ionic-native/file';
// import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
// import {FileOpener} from '@ionic-native/file-opener';
// import {InAppBrowser} from '@ionic-native/in-app-browser';
// import { APK_DOWNLOAD,APP_DOWNLOAD } from '../publics/Constants';
import { Observable } from 'rxjs/Observable';
import { AppService } from './service-public-service/service-public-service';
import { AppMinimize } from '@ionic-native/app-minimize';

@Injectable()
export class NativeService {
  private v=null;
  private appType;
  private appUrl;
  private appV;
  constructor(private platform: Platform,
              private alertCtrl: AlertController,
            //   private transfer: FileTransfer,
            //   private appVersion: AppVersion,
              // private file: File,
            //   private fileOpener: FileOpener,
            //   private inAppBrowser: InAppBrowser,
              private appService: AppService,
              private appMinimize:AppMinimize) {
  }
  /**
   * 检查app是否需要升级
   */
//   detectionUpgrade() {
//       this.appType=this.isAndroid()?'android':'ios';
//       this.getVersionNumber().subscribe(av=>{
//         this.appV=av;
//         this.appService.httpPost('appVersionUpdate',{osType:this.appType},data=>{         
//           this.v=data.version['v']||'';
//           this.appUrl=data.version['url']||'';          
//           if(this.v>this.appV){
//             if(this.appType=='android'){
//               this.alertCtrl.create({
//                 title: '升级',
//                 subTitle: '发现新版本,是否立即升级？',
//                 buttons: [{text: '取消'},
//                   {
//                     text: '确定',
//                     handler: () => {
//                       this.downloadApp();
//                     }
//                   }
//                 ]
//               }).present();
//             }else{
//               this.openUrlByBrowser(this.appUrl);
//             }
//           }
//         })
//       })   
//   }

  /**
   * 下载安装app
   */
//   downloadApp() {
//     if (this.isAndroid()) {
//       let alert = this.alertCtrl.create({
//         title: '下载进度：0%',
//         enableBackdropDismiss: false,
//         buttons: ['后台下载']
//       });
//       alert.present();
  
//       const fileTransfer: FileTransferObject  = this.transfer.create();
//       const apk = this.file.externalRootDirectory + 'download/' +  'yan.apk'; //apk保存的目录
//       fileTransfer.download(this.appUrl, apk).then(() => {
//        this.fileOpener.open(apk,'application/vnd.android.package-archive');
//       }, err => {
//         alert && alert.dismiss();
//         this.alertCtrl.create({
//           title: '前往网页下载',
//           subTitle: '本地升级失败',
//           buttons: [{
//             text: '确定', handler: () => {
//               this.inAppBrowser.create(this.appUrl, '_system');
//             }
//           }]
//         }).present();
//       });
//       fileTransfer.onProgress((event: ProgressEvent) => {
//         let num = Math.floor(event.loaded / event.total * 100);
//         if (num === 100) {
//           alert.dismiss();
//         } else {
//           let title = document.getElementsByClassName('alert-title')[0];
//           title && (title.innerHTML = '下载进度：' + num + '%');
//         }
//       });
//     }
//     if (this.isIos()) {
//       this.openUrlByBrowser(this.appUrl);
//     }
//   }

  /**
   * 通过浏览器打开url
   */
//   openUrlByBrowser(url:string):void {
//     this.inAppBrowser.create(url, '_system');
//   }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
//   getVersionNumber(): Observable<string> {
//     return Observable.create(observer=>{
//       this.appVersion.getVersionNumber().then((value: string) => {
//         observer.next(value);
//       }).catch(err => {
//         console.log('getVersionNumber:' + err);
//       });
//     })
//   }
  
   /**
   * 获得app包名
   * @description  对应/config.xml中id的值
   * @returns {Promise<string>}
   */
//   getPackageName(): Observable<string> {
//     return Observable.create(observer => {
//       this.appVersion.getPackageName().then((value: string) => {
//         observer.next(value);
//       }).catch(err => {
//         observer.error(false);
//       });
//     });
//   }
   /**
   * 获得app name,如现场作业
   * @description  对应/config.xml中name的值
   */
//   getAppName(): Observable<string> {
//     return Observable.create(observer => {
//       this.appVersion.getAppName().then((value: string) => {
//         observer.next(value);
//       }).catch(err => {
//         observer.error(false);
//       });
//     });
//   }
  // 最小化插件
  minimize(): void {
    this.appMinimize.minimize()
  }
}