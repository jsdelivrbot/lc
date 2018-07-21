import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  @ViewChild(Navbar) navbar: Navbar;
  scanType = 1;
  protected destory = false;

  curCodeId = "";
  curGoodName = "";
  hasTraceablityCode = false;

  protected goods = new Array();
  protected gifts = new Array();
  goodsNum = 0;
  giftsNum = 0;
  public backgroundnone = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public appService: AppService,
    private platform: Platform,
  ) {

  }
  ionViewWillEnter() {
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
    // 处理ios 页面滑动效果
    this.navCtrl.swipeBackEnabled = false;
    setTimeout(() => {
      this.backgroundnone = true;
    }, 800);
    //返回提示
    this.navbar.backButtonClick = (e: UIEvent) => {
      this.onBack();
    }
    this.platform.registerBackButtonAction(() => {
      this.onBack();
    });
    
  }
  ionViewWillUnload() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
  }
  onBack() {
    if (this.goodsNum == 0 && this.giftsNum == 0) {
      this.destory = true;
      this.qrScanner.destroy();
      this.viewCtrl.dismiss();     
    } else {
      this.appService.alert('您的操作未完成，确定要退出？',callback=> {
          try {
            this.destory = true;
            this.qrScanner.destroy();
          } catch (e) {} finally {
            this.navCtrl.popToRoot();
          }

      });
    }
  }
  //开启扫一扫
  scan() {
    this.qrScanner.scan().subscribe((text: string) => {
      if (this.destory) {
        this.restartScan();
        return;
      }
      if (!this.hasTraceablityCode || text.length == 13) {
        this.postCodeIdApi(text);
      }else{
        if (this.curCodeId == "") {
          this.appService.toast("错误的产品条码");
        }else{
          this.postIntegeralCodeApi(text);
        }
      }
     
    });
  }

  postCodeIdApi(code){
    this.appService.httpPost('getScanCodeCasPosSale.api',{code: code}, data => {
      this.destory = false;
      this.restartScan();
      if (data.code == -1) {
        this.appService.toast(data.msg);
      } else {
        let goodMap = data.data.goodMap;
        this.curCodeId = goodMap.goodsId;
        this.curGoodName = "商品名称：" + goodMap.goodsDesc;
        if (goodMap.tag == 0) {
          this.hasTraceablityCode = false;
          this.codeIdVerify();
        }else{
          this.hasTraceablityCode = true;
        }
      }

    }, true);
  }

  postIntegeralCodeApi(code){
    this.appService.httpPost('checkIntegralCode.api',{'integralCode': code}, data => {
      this.destory = false;
      this.restartScan();
      if (data.code == -1) {
        this.appService.toast(data.msg);
      } else if (data.code == 1) {
        this.complain(data.data);
      }else{
        this.verifyGoodCode(code);
      }
    }, true);
  }

  complain(data){
    this.destory = true;
    let dialog = this.alertCtrl.create({
      title: '追溯码已出售',
      message: "销售门店：" + data.storeDesc + "<br>" + "商品名称：" + data.goodsDesc,
      buttons: [
        {
          text: '投诉',
          handler: () => {
            this.navCtrl.push('ComplainFormsPage', { data: data }, {
              animation: 'md-transition'
            });
          }
        },
        {
          text: '取消',
          handler: () => {
            this.destory = false;
          }
        }
      ]
    });
    dialog.present();
  }

  codeIdVerify(){
    var num = 0;
    var index = -1;
    let tempArrs = [];
    if (this.scanType == 1) {
      tempArrs = this.goods;
    }else{
      tempArrs = this.gifts;
    }
    for (var i = 0; i < tempArrs.length; ++i) {
      let map = tempArrs[i];
      if (map.goodsId == this.curCodeId) {
        num += 1;
        if (index == -1) {
          index = i;
        }
      }
    }
    if (num == 0) {
      this.showInputNum(0);
    }else{
      if (this.scanType == 1) {
        this.goods.splice(index,num);
      }else{
        this.gifts.splice(index,num);
      }
      this.showInputNum(num);
    }
    
  }

  restartScan(){
    let time = setTimeout(() => {
      this.scan();
      clearTimeout(time)
    }, 500)
  }

  //验证商品条码是否存在
  verifyGoodCode(code){

    for (var i = 0; i < this.goods.length; ++i) {
      if (this.goods[i].code == code) {
        this.showRepeat(1,i);
        return;
      }
    }

    for (var j = 0; j < this.gifts.length; ++j) {
      if (this.gifts[j].code == code) {
        this.showRepeat(2,j);
        return;
      }
    }
  
    if (this.scanType == 1) {
      this.goods.push({'goodsId':this.curCodeId,'code':code});
      this.goodsNum = this.goods.length;
    }else{
      this.showSourceRadio(code,1);
    }
  }
  
  scanGood(){
    this.scanType = 1;
  }

  scanGift(){
    this.scanType = 2;
  }

  //提交
  submit() {
    
    if (this.goods.length == 0) {
      this.appService.toast('不能为空')
      return;
    }
    var resultObect = { 'goods': this.goods, 'gifts': this.gifts };
    console.log(resultObect);
    this.appService.httpPost('submitScanCodeCasPosSale.api',
        {'resultObject': JSON.stringify(resultObect).replace(/\[{2,}/, '[').replace(/\]{2,}/, ']')}, data => {
        if (data.code == -1) {
          this.appService.toast(data.msg);
        } else {
          this.destory = true;
          this.qrScanner.destroy();
          this.appService.setItem('sc', resultObect);
          this.navCtrl.push('SalePage', { scannerData: data.data }, {
            animation: 'md-transition'
          });
        }
      }, true);
  }

  showPrompt() {
    this.destory = true;
    let prompt = this.alertCtrl.create({
      title: '手动输入',
      enableBackdropDismiss: false,
      inputs: [
        { type: "text" },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            this.destory = false;
          }
        },
        {
          text: '确定',
          handler: data => {
            this.destory = false;
            if (!data[0]) {
              this.appService.toast('不能为空')
            } else {
              if (!this.hasTraceablityCode || data[0].length == 13) {
                this.postCodeIdApi(data[0]);
              }else{
                if (this.curCodeId == "") {
                  this.appService.toast("错误的产品条码");
                }else{
                  this.postIntegeralCodeApi(data[0]);
                }
              }

            }
          }
        }
      ]
    });
    prompt.present();
  }
  showRepeat(type, pos) {
    this.destory = true;
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '该追溯码已存在',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '删除',
          handler: () => {
            this.destory = false;
            if (type == 1) {
              this.goods.splice(pos, 1);
              this.goodsNum = this.goods.length;
            } else {
              this.gifts.splice(pos, 1);
              this.giftsNum = this.gifts.length;
            }
          }
        },
        {
          text: '取消',
          handler: () => {
            this.destory=false;
          }
        }
      ]
    });
    confirm.present();
  }

  showInputNum(num) {
    this.destory = true;
    let confirm = this.alertCtrl.create({
      title: '输入数量',
      inputs: [
        {
          type: "number",
          value: num==0?'':num
        },
      ],
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.destory=false;
            if (data[0] <= 0) {
              return false;
            }
            if (this.scanType == 1) {
              for (var i = 0; i < parseInt(data[0]); ++i) {
                this.goods.push({'goodsId':this.curCodeId,'code':'8888'});
              }
              this.goodsNum = this.goods.length;
            } else {
              this.showSourceRadio('8888',parseInt(data[0]));
            }
          }
        },
        {
          text: '取消'
        }
      ]
    });
    confirm.present();
  }

  showSourceRadio(code,num) {
    this.destory = true;
    let alert = this.alertCtrl.create({enableBackdropDismiss: false});

    alert.setTitle('选择赠品来源');

    alert.addInput({
      type: 'radio',
      label: "借门店",
      value: '0',
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
      handler: data => {
        this.destory = false;
        for (var i = 0; i < num; ++i) {
          this.gifts.push({ 'goodsId': this.curCodeId, 'code': code, 'source': data });
        }
        this.giftsNum = this.gifts.length;
      }
    });
    alert.present();
  }

}
