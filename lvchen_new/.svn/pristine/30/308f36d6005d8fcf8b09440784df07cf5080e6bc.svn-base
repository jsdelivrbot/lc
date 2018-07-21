import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the MyCustomerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-customer-info',
  templateUrl: 'my-customer-info.html',
})
export class MyCustomerInfoPage {
  @ViewChild(Navbar) navbar: Navbar;

  public selectedTab: number = 1;
  public recordType: number = 1;
  public memberPhone: string = '';
  public memberName: string = '';
  public products: string = '';
  public habits: string = '';
  public babys: Array<any> = [];
  public salesRecord: Array<any> = [];
  public giveRecord: Array<any> = [];
  public depositRecord: Array<any> = [];
  public remarksRecord: Array<any> = [];
  public recordData: Array<any> = []
  public isHideBack: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
  }

  ionViewDidLoad() {
    if (this.navParams.data.type) {
      this.isHideBack = true;
    }
    this.getCustomerInfo();
  }

  // 切换导航标签
  changeTab(type) {
    this.selectedTab = type;
  }

  // 切换记录标签
  changeRecordType(type) {
    this.recordType = type;
    this.recordData = [];
    if (type == 1) {
      for (let i = 0; i < this.salesRecord.length; i++) {
        this.recordData.push({
          data1: this.salesRecord[i].goodsName,
          data2: this.salesRecord[i].saleAmount,
          data3: this.salesRecord[i].tradeTime.time
        })
      }
    }
    else if (type == 2) {
      for (let i = 0; i < this.giveRecord.length; i++) {
        this.recordData.push({
          data1: this.giveRecord[i].goodsName,
          data2: this.giveRecord[i].saleAmount,
          data3: this.giveRecord[i].tradeTime.time
        })
      }
    }
    else if (type == 3) {
      for (let i = 0; i < this.depositRecord.length; i++) {
        this.recordData.push({
          data1: this.depositRecord[i].goodsName,
          data2: this.depositRecord[i].goodsNum,
          data3: this.depositRecord[i].depositTime.time
        })
      }
    }
    else if (type == 4) {
      for (let i = 0; i < this.remarksRecord.length; i++) {
        this.recordData.push({
          data1: this.remarksRecord[i].remarks,
          data2: this.remarksRecord[i].remarkTime.time
        })
      }
    }
  }

  // 获取顾客信息
  getCustomerInfo() {
    this.appService.httpPost('findMemberDetails.api', {
      memberPhone: this.navParams.data.memberPhone,
    }, (res) => {
      if (res.code == 1) {
        this.memberPhone = res.memberPhone;
        this.memberName = res.memberName;
        this.products = res.products;
        this.habits = res.habits;
        this.babys = res.babys;
        this.salesRecord = res.salesRecord;
        this.giveRecord = res.giveRecord;
        this.depositRecord = res.depositRecord;
        this.remarksRecord = res.remarksRecord;
        this.changeRecordType(1);
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true)
  }

  // 返回
  lastStep() {
    this.navCtrl.popToRoot({ animation: 'md-transition' });
  }

  // 编辑
  editInfo() {
    this.navCtrl.push('CustomerLoggingPage', { memberPhone: this.navParams.data.memberPhone, type: true });
  }
}
