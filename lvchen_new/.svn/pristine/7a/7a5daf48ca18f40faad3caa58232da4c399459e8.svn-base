import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SalesPerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-performance',
  templateUrl: 'sales-performance.html',
})
export class SalesPerformancePage {
  public storeName: string = "业务组";
  public storeId: number = 1;
  // 下一级业务组
  public nextOrg: Array<any> = [];
  public salesData: object = {};
  public SalesPerformanceDetailPage = 'SalesPerformanceDetailPage'
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    // 获取业务组名称
    this.appService.getItem("curStore", (obj) => {
      this.storeName = obj.storeName;
      this.storeId = obj.id;
    });
    this.getSalesData();
    this.getNextOrg();
  }

  // 获取数据
  getSalesData() {
    this.appService.httpPost("findIndexSalesAnalysis.api", {
      storeId: this.storeId
    }
      , (res) => {
        if (res.code == 1) {
          this.salesData = res;
        }
        else {
          this.appService.alert(res.msg);
        }
      }, true);
  }

  // 去前五个
  goToDetail(type) {
    this.navCtrl.push('SalesPerformanceDetailPage', {
      storeName: this.storeName,
      storeId: this.storeId,
      type
    });
  }

  // 去寄存
  goToConsign(type) {
    this.navCtrl.push('SalesPerformanceConsignPage', {
      storeName: this.storeName,
      storeId: this.storeId,
      type
    });
  }

  /**
   * @description 获取下一级业务组
   */
  getNextOrg() {
    this.appService.httpPost("getNextOrg.api", {}
      , (res) => {
        if (res.code == 1) {
          this.nextOrg = res.data;
          // 处理业务组数据
          for (let i = 0; i < this.nextOrg.length; i++) {
            this.nextOrg[i] = {
              type: 'radio',
              label: this.nextOrg[i].orgName,
              value: [this.nextOrg[i].orgId, this.nextOrg[i].orgName]
            }
          }
          // 将当前业务组插入最前面
          this.nextOrg.unshift({
            type: 'radio',
            label: this.storeName,
            value: [this.storeId, this.storeName]
          });
        }
      });
  }
  /**
   * @description 更改业务组
   */
  showNextOrg() {
    if (this.nextOrg.length < 1) {
      return;
    }
    let alert = this.alertCtrl.create({
      title: '选择业务组',
      inputs: this.nextOrg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            // 选了业务组以后拿业务组数据
            if (data) {
              this.storeId = data[0];
              this.getSalesData();
              this.storeName = data[1];
            }
          }
        }
      ]
    });
    alert.present();
  }
}
