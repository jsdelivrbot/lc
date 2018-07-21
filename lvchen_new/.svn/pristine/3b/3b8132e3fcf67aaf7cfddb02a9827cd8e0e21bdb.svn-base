import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the RepayGiftDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repay-gift-detail',
  templateUrl: 'repay-gift-detail.html',
})
export class RepayGiftDetailPage {
  @ViewChild(Navbar) navbar: Navbar;
  protected customPhone: number;
  protected repayDetailList: Array<any>;
  public isConfirm: boolean = false;
  public second: number = 60;
  public canGetCode: boolean = true;
  public tipText: string = '验证码已发至顾客手机';
  public titleText: string = '欠礼品明细';
  public isReturn: boolean = true;
  public code = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public appservice: AppService) {
    this.customPhone = this.navParams.get('phone');
    this.appservice.httpPost('getOweGoodsOrder.api',
      {
        phone: this.navParams.get('phone'),
      }, data => {
        console.log(data)
        if (data.code == 1) {
          this.repayDetailList = data.data || [];
        }
      })
    console.log(this.navParams.get('phone'))
  }



  // 马上换货按钮
  goodsImmediately() {
    // 切换显示部分
    this.isConfirm = !this.isConfirm;
    if (this.canGetCode) {
      this.getCode();
    }
  }

  // 获取验证码
  getCode() {
    this.canGetCode = false;
    this.countSecond();
    this.appservice.httpPost("get_phone_code.api", {
      phone: this.customPhone,
      code: 5
    }, (res) => {
      console.log(res);
      if (res.code == 1) {
        console.log(res.msg);
        this.tipText = "验证码已发至顾客手机"
      }
      else {
        this.appservice.alert(res.msg);
      }
    });
  }

  // 确认还货
  confirmRepay() {
    let repayGoods: Array<number> = [];
    for (let i = 0; i < this.repayDetailList.length; ++i) {
      repayGoods.push(this.repayDetailList[i].id)
    }
    this.appservice.httpPost("submitOweGoodsOrder.api", {
      ids: JSON.stringify(repayGoods),
      phone: this.customPhone,
      code: this.code
    }, (res) => {
      console.log(res);

      if (res.code == 1) {
        this.appservice.alert(res.msg);
        this.titleText = "还赠品成功";
        this.isReturn = false;
        this.isConfirm = !this.isConfirm;
      }
      else {
        this.appservice.alert(res.msg);
      }
    })
  }

  // 数秒
  countSecond() {
    setTimeout(() => {
      this.second--;
      if (this.second > 0) {
        this.countSecond();
      }
      else {
        this.second = 60;
        this.canGetCode = true;
        this.tipText = "没收到验证码？点击重新发送！"
      }
    }, 1000);
  }
}
