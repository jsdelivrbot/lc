import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SalesPerformanceConsignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-performance-consign',
  templateUrl: 'sales-performance-consign.html',
})
export class SalesPerformanceConsignPage {
  public Title: string = "寄存额";
  public storeName: string = "业务组";
  public storeId: number = 1;
  // 业绩类型
  public tag: number = 1;
  // 季度
  public dateType: number = 1;
  public titleArr: object = {
    3: "寄存销售额",
    7: "寄存领取额",
    8: "寄存剩余额"
  };
  public tableTitle: string = "业务组";
  public listMap: Array<any> = [];
  public tail: number = 0;
  public amountCount: number = 0;
  public numCount: number = 0;

  identity = 0; //-1业务员，1员工，2、3导购
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
    this.appService.getItem('userInfo', val => {
      this.identity = val['tag'];
    })
  }

  ionViewDidLoad() {
    this.tag = this.navParams.data.type;
    this.Title = this.titleArr[this.tag];
    // 获取业务组名称
    this.storeName = this.navParams.data.storeName;
    this.storeId = this.navParams.data.storeId;
    // 获取数据
    this.getData();
  }

  getData() {
    this.appService.httpPost("findSecoundSalesAnalysis.api", {
      storeId: this.storeId,
      tag: this.tag,
      dateType: this.dateType
    }, (res) => {
      if (res.code == 1) {
        this.listMap = res.data.listMap;
        if (this.identity == 2 || this.identity == 3) {
          this.tableTitle = "时间";
        }
        else {
          this.tail = res.data.tail;
          if (this.tail == 1) {
            this.tableTitle = "门店";
          }
          for (let i = 0; i < this.listMap.length; i++) {
            this.amountCount += this.listMap[i].amount;
            this.numCount += this.listMap[i].surplusNumSum != undefined ? this.listMap[i].surplusNumSum : this.listMap[i].receiveNumSum != undefined ? this.listMap[i].receiveNumSum : this.listMap[i].depositNumSum;
          }
        }
      }
    }, true);
  }
}
