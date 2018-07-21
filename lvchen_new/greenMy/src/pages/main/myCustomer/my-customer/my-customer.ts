import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the MyCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-customer',
  templateUrl: 'my-customer.html',
})
export class MyCustomerPage {
  public isCondition: boolean = false;
  public startDate: string = '';
  public endDate: string = '';
  public dateTag: number = 1;
  public memberPhone: string = '';
  public page: number = 1;
  public rows: string = '20';
  public searchCondition: object = {
    startDate: '',
    endDate: '',
    dateTag: 1
  }
  public customers: Array<any> = [];
  public dateText: string = '当天';
  public hasNextPage: boolean = true;
  public canGetMoreData = true;
  public labelId: string = "";
  public labelArr: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,) {
  }

  ionViewDidLoad() {
    this.getCustomer(false);
    this.getLabels();
  }

  // 搜索条件确定
  confirmCondition() {
    this.customers = [];
    this.page = 1;
    this.hasNextPage = true;
    // 隐藏条件模块
    this.isCondition = false;
    // 点击了确定按钮才保存搜索条件
    this.searchCondition = {
      startDate: this.startDate,
      endDate: this.endDate,
      dateTag: this.dateTag
    }
    // 改变搜索条件显示
    this.dateText = this.dateTag == 1 ? "当天" : this.dateTag == 2 ? "昨天" : "当月";
    if (this.startDate != '' || this.endDate != '') {
      this.dateText = '自定义';
    }
    // 获取数据
    this.getCustomer(false);
    // 先设置不能再获取数据，异步获取数据后会判断还能不能获取数据
    this.canGetMoreData = false;
  }

  // 关闭搜索条件
  closeCondition($event) {
    if ($event.target.className != "condition-cover") {
      return;
    }
    this.isCondition = false;
  }

  // 显示搜索条件
  condition() {
    this.isCondition = !this.isCondition;
  }

  // 选择时间
  selectTime(type) {
    this.dateTag = type;
    this.startDate = '';
    this.endDate = '';
  }

  // 查看顾客详细信息
  checkInfo(memberPhone) {
    this.navCtrl.push('MyCustomerInfoPage', { memberPhone: memberPhone, type: false });
  }

  // 获取顾客数据
  getCustomer($event) {
    if (this.memberPhone != '') {
      // 手机号码错误
      if (!this.checkPhone(this.memberPhone)) {
        // 完成本次加载
        if ($event) {
          $event.complete();
        }
        // 让上拉加载消失
        this.hasNextPage = false;
        // 过一会才让它可以继续请求数据
        setTimeout(() => {
          this.canGetMoreData = true;
        }, 500)
        return;
      }
    }
    // 判断是否可以继续请求数据
    if (!this.canGetMoreData) {
      return;
    }
    this.appService.httpPost('findUserHasMembers.api', {
      startToDate: this.searchCondition['startDate'],
      endToDate: this.searchCondition['endDate'],
      dateTag: this.searchCondition['dateTag'],
      memberPhone: this.memberPhone,
      labelId: this.labelId,
      page: this.page,
      rows: this.rows,
    }, (res) => {
      if (res.code == 1) {
        for (let i = 0; i < res.list.length; i++) {
          this.customers.push(res.list[i]);
        }
        // 完成本次加载
        if ($event) {
          $event.complete();
        }
        // 判断是否还有下一页
        if (res.list.length < this.rows) {
          // 没有的话让上拉加载消失
          this.hasNextPage = false;
        }
        else {
          this.hasNextPage = true;
        }
        this.canGetMoreData = true;
      }
      else {
        this.hasNextPage = false;
        if ($event) {
          $event.complete();
        }
        this.appService.alert(res.msg);
      }
    })
  }

  // 搜索按钮
  searchButton() {
    // 重置搜索条件个结果
    this.customers = [];
    this.page = 1;
    this.hasNextPage = true;
    // 获取数据
    this.getCustomer(false);
    this.canGetMoreData = false;
  }

  // 上拉加载
  getMoreData($event) {
    this.page++;
    this.getCustomer($event);
  }

  // 检查手机格式
  checkPhone(phone) {
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      this.appService.alert("请填写正确的手机号码！");
      return false;
    }
    return true;
  }

  // 获取标签
  getLabels() {
    this.appService.httpPost("brandSelection.api", {}, (res) => {
      console.log(res);
      if (res.code == 1) {
        this.labelArr = res.data;
      }
    });
  }
}
