import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the CustomerLoggingTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-logging-tabs',
  templateUrl: 'customer-logging-tabs.html',
})
export class CustomerLoggingTabsPage {

  public products: Array<any> = [];
  public habits: Array<any> = [];
  public labels: Array<any> = [];
  public checkProducts: Array<any> = [];
  public checkHabits: Array<any> = [];
  public isDisabled: boolean = false;
  public phone: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
  }

  ionViewDidLoad() {
    console.log('加载 CustomerLoggingTabsPage');
    this.getTabs();
    if (this.navParams.data.type) {
      this.getCheckTabs();
    }
  }

  // 获取标签
  getTabs() {
    this.appService.httpPost("findAllMemberLabel.api", {
      userId: JSON.parse(window.localStorage.getItem('userInfo'))['id']
    }, (res) => {
      // 获取产品
      if (res.code == 1) {
        for (const key in res.products) {
          if (res.products.hasOwnProperty(key)) {
            for (const key2 in res.products[key]) {
              this.products.push({
                'id': key2,
                'tabName': res.products[key][key2]
              });
            }
          }
        }
      }
      // 获取习惯
      if (res.code == 1) {
        for (const key in res.habits) {
          if (res.habits.hasOwnProperty(key)) {
            for (const key2 in res.habits[key]) {
              this.habits.push({
                'id': key2,
                'tabName': res.habits[key][key2]
              });
            }
          }
        }
      }
      else {
        this.appService.alert(res.log)
      }
    })
  }

  // 获取已经选中的标签
  getCheckTabs() {
    this.appService.httpPost("editMemberDetail.api", {
      memberPhone: this.navParams.data.memberData.memberPhone
    }, (res) => {
      if (res.code == 1) {
        this.checkHabits = res.checkHabits;
        this.checkProducts = res.checkProducts;
      }
      else {
        this.appService.alert(res.msg);
      }
    })
  }

  // 选择标签
  selectTab(tabId) {
    // 存在就删除
    if (this.labels.indexOf(tabId) != -1) {
      this.labels.splice(this.labels.indexOf(tabId), 1);
    }
    // 不存在就添加
    else {
      this.labels.push(tabId);
    }
  }

  // 上一步
  lastStep() {
    this.navCtrl.pop();
  }

  // 提交
  submit() {
    let data = this.navParams.data.memberData;
    data['labels'] = this.labels.join(",");
    let url = "submitNewMemberLabel.api";
    let params = {
      resultObject: JSON.stringify(data)
    };
    this.phone = data['memberPhone'];
    if (this.navParams.data.type) {
      url = "editSubmitMemberDetail.api";
      let newdata = {
        remark: data['remarks'],
        labels: data['labels'],
        babys: data['babys'],
      }
      data = newdata;
      params['memberPhone'] = this.phone;
      params['resultObject'] = JSON.stringify(data);
    }

    this.appService.httpPost(url, params, (res) => {
      if (res.code == 1) {
        this.appService.alert(res.msg);
        this.navCtrl.push('MyCustomerInfoPage', { memberPhone: this.phone, type: true });
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true)

  }
}
