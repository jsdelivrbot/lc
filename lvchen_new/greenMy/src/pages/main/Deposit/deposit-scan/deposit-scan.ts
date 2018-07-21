import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, Platform, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the DepositScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-scan',
  templateUrl: 'deposit-scan.html',
})
export class DepositScanPage {
  @ViewChild(Navbar) navbar: Navbar;
  protected light: boolean = false;
  protected frontCamera: boolean = false;
 
  scanType = 1;

  curGoodName = "";

  goods = new Array();
  gifts = new Array();

  goodsNum = 0;
  giftsNum = 0;

  isFirst = true;
  public backgroundnone = false;
  protected destory = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public apps: AppService,
    private platform: Platform
  ) {
  }

  ngOnInit() {
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
  ionViewWillEnter() {
    //获取摄像权限
    this.destory = false;
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        if (status.authorized) {

          this.scan();

          this.qrScanner.show();

        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ionViewWillUnload() {
    this.platform.registerBackButtonAction(() => {
      this.destory = true;
      this.qrScanner.destroy();
      this.navCtrl.pop();
    });


  }

  onBack() {
    if (this.goodsNum == 0 && this.giftsNum == 0) {
      this.viewCtrl.dismiss();
      this.destory = true;
      this.qrScanner.destroy();
    } else {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '您的操作未完成，确定要退出？',
        buttons: [
          {
            text: '确定',
            handler: () => {
              try {

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
            }
          }
        ]
      });
      confirm.present();
    }
  }
  //开启扫一扫
  scan() {
    this.qrScanner.scan().subscribe((text: string) => {
      if (this.destory) {
        this.restartScan();
        return;
      }
      this.apps.httpPost('getScanCodeCasPosSale.api',{
          code: text
        }
        , data => {
          this.destory = false;
          this.restartScan();
          if (data.code == -1) {
            this.apps.toast(data.msg);
          } else {
            this.curGoodName = data.data.goodMap.goodsDesc;
            this.verifyGood(data.data.goodMap.goodsId);
          }
        }, true);
    });
  }


  //验证商品条码是否存在
  verifyGood(goodId) {

    if (this.scanType == 1) {
      for (var i = 0; i < this.goods.length; ++i) {
        if (this.goods[i].id == goodId) {
          this.showChangeNum(this.goods[i]);
          return;
        }
      }
    } else {
      for (var j = 0; j < this.gifts.length; ++j) {
        if (this.gifts[j].id == goodId) {
          this.showChangeNum(this.gifts[j]);
          return;
        }
      }
    }

    this.showInputNum(goodId);
  }

  scanGood() {
    this.scanType = 1;
  }

  scanGift() {
    this.scanType = 2;
  }


  //提交
  submit() {

    if (this.goods.length == 0) {
      return;
    }
    const resultObect = { 'goods': this.goods, 'gifts': this.gifts };
    this.apps.httpPost('checkInReceiptActGoods.api', {
      'resultObject': JSON.stringify(resultObect)
    }    
    , data => {
      if (data.code == -1) {
        this.apps.toast(data.msg);
        this.destory = false;
      } else {
        let params = {
          data: data.data,
          goods: this.goods,
          goodsNum: this.goodsNum,
          gifts: this.gifts,
          giftsNum: this.giftsNum,
        };
        this.navCtrl.push('DepositCheckPage', params);
        this.qrScanner.hide();
        this.qrScanner.destroy();
      }
    }, true);
  }

  showPrompt() {
    this.destory = true;
    let prompt = this.alertCtrl.create({
      title: '输入码',
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
            this.apps.httpPost('getScanCodeCasPosSale.api', {
              code: data[0]
            }
            , data => {
              this.destory = false;
              this.restartScan();
              if (data.code == -1) {
                this.apps.toast(data.msg);
              } else {
                this.curGoodName = data.data.goodMap.goodsDesc;
                this.verifyGood(data.data.goodMap.goodsId);
              }
            }, true);
          }
        }
      ]
    });
    prompt.present();
  }

  showInputNum(goodId) {
    this.destory = true;
    let confirm = this.alertCtrl.create({
      title: '输入数量',
      inputs: [
        {
          type: "number",
        },
      ],
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '确定',
          handler: data => {
            this.destory = false;
            if (data[0] == "" || data[0] <= 0) {
              return false;
            }
            if (this.scanType == 1) {
              this.goods.push({ 'id': goodId, 'num': data[0] });
              this.goodsNum = this.goodsNum + parseInt(data[0]);
            } else {
              this.gifts.push({ 'id': goodId, 'num': data[0] });
              this.giftsNum = this.giftsNum + parseInt(data[0]);
            }

          }
        }
      ]
    });
    confirm.present();
  }

  showChangeNum(good) {
    this.destory = true;
    var gid = good['id'];
    let confirm = this.alertCtrl.create({
      title: '修改数量',
      inputs: [
        {
          type: "text",
        },
      ],
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.destory = false;
          }
        },
        {
          text: '确定',
          handler: data => {
            this.destory = false;
            if (data[0] == 0 || !data[0]) {
              if (this.scanType == 1) {
                var iNum;
                for (var i = 0; i < this.goods.length; i++) {
                  if (this.goods[i]['id'] && this.goods[i]['id'] == gid) {
                    iNum = i
                  } else {
                    iNum = 0
                  }
                }
                this.goods.splice(iNum, 1);
                let GNUM = 0;
                if (this.goods.length >= 1) {
                  for (let k = 0; k < this.goods.length; k++) {
                    GNUM = GNUM + Number(this.goods[k]['num']);
                  }
                }
                this.goodsNum = GNUM;
              } else {
                var gNum;
                for (var j = 0; j < this.gifts.length; j++) {
                  if (this.gifts[j]['id'] == gid) {
                    gNum = j
                  }
                }
                this.gifts.splice(gNum, 1);
                let GiNUM = 0;
                for (let q = 0; q < this.goods.length; q++) {
                  GiNUM = GiNUM + Number(this.goods[q]['num']);
                }
                this.giftsNum = GiNUM;
              }
              return;
            }
            good.num = data[0];
            if (this.scanType == 1) {
              var total = 0;
              for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i]['id'] == gid) {
                  this.goods[i]['num'] = data[0]
                }
                total = total + Number(this.goods[i]['num']);
              }
              this.goodsNum = total;
            } else {
              var gtotal = 0;
              for (let i = 0; i < this.gifts.length; i++) {
                if (this.gifts[i]['id'] == gid) {
                  this.gifts[i]['num'] = data[0]
                }
                gtotal = gtotal + Number(this.gifts[i]['num']);
              }
              this.giftsNum = gtotal;
            }
          }
        }
      ]
    });
    confirm.present();
  }

  restartScan(){
    let time = setTimeout(() => {
      this.scan();
      clearTimeout(time)
    }, 500)
  }
}
