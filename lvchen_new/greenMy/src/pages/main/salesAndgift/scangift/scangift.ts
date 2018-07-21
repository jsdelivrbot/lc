import { Component,ViewChild} from '@angular/core';
import { IonicPage,Navbar,Platform, NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the  page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scangift',
  templateUrl: 'scangift.html',
})
export class ScangiftPage {
  @ViewChild(Navbar)navbar:Navbar;
  protected light: boolean = false;
  protected frontCamera: boolean = false;
  public backgroundnone=false;
  userId;
  num = 0;
  isFirst = true;
  // 储存本地变量
  public presentMap=[];
  protected destory = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public appService: AppService,
    public platform: Platform
  ) {
  }
  ionViewWillEnter(){
    this.appService.getItem('pre',val=>{
      this.presentMap=val['presentMap']||[];
      
      this.num=this.presentMap.length||0;
    })
     //获取摄像权限
     this.destory=false;
     this.qrScanner.prepare()
     .then((status: QRScannerStatus) => {

       if (status.authorized) {

         this.scan();

         this.qrScanner.show();

       }
   })
   .catch((e: any) => console.log('Error is', e));
  }

  ngOnInit() {

    setTimeout(()=>{
      this.backgroundnone=true;
    },800);
   
    //返回提示
    this.navbar.backButtonClick = (e:UIEvent)=>{
      this.onBack();
    }
    this.platform.registerBackButtonAction(() => {
      this.onBack();
    });
   
  }
  
  onBack(){
    this.destory=true;
    if (this.num==0) {
        this.viewCtrl.dismiss();
        this.qrScanner.destroy();
    }else{
        let confirm = this.alertCtrl.create({
          title: '提示',
          message: '您的操作未完成，确定要退出？',
          buttons: [
            {
              text: '确定',
              handler: () => {
                try {
                  this.appService.removeItem('cb')
                  this.destory = true;
                  this.qrScanner.destroy();
                } catch (e) {
  
                } finally {
                  this.navCtrl.popToRoot();
                }
  
              }
            },
            {
              text: '取消',
              handler: () => {
                this.destory=false;
              this.scan();
              }
            }
          ]
        });
        confirm.present();
    }
  }
  //开启扫一扫
  scan(){
   this.qrScanner.scan().subscribe((text: string) => {
      if (this.destory) {
        this.restartScan();
        return;
      }
      this.appService.httpPost('findGiftGoods.api',
        {code:text},data => {
        if (data.code == -1) {
          this.appService.toast(data.msg);
        }else{
          if (data.data.length == 0) {
          	this.appService.toast('没有结果');
          }else{
          	this.showSourceRadio(data.data[0]);
          }
         
        }
        var timeout = setTimeout(() => {
          if (!this.destory) {
            this.scan();
          }
          clearTimeout(timeout);
        }, 500);
       
      },true);
    });
  }
  
  restartScan(){
    let time = setTimeout(() => {
      this.scan();
      clearTimeout(time)
    }, 500)
  }

  search(){
    this.navCtrl.push('SelectGiftPage',{
      animation: 'md-transition'
    });
  }

  //提交
  submit() {
    this.destory=true;
    this.qrScanner.destroy();
    let params={
      presentMap:this.presentMap,
    }
    this.appService.setItem('pre',params)
    this.navCtrl.pop();
  }

  showSourceRadio(data) {
    this.destory=true;
    let alert = this.alertCtrl.create();
    
    alert.setTitle('选择礼品来源');

    alert.addInput({
        type: 'radio',
        label: "借门店",
        value: '0',
        checked: false
    });
    
    alert.addInput({
        type: 'radio',
        label: "欠顾客",
        value: '1',
        checked: false
    });

    alert.addInput({
        type: 'radio',
        label: "其它",
        value: '2',
        checked: true
    });

    alert.addButton({
      text: '确定',
      handler: result => {
        this.destory=false;
        this.presentMap.push({'id':data.goodsId,'name':data.goodsName,'num':'1','source':result});
        this.num = this.presentMap.length;
        this.scan();
      }
    });
    alert.present();
  }

}
