import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the CustomerLoggingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-logging',
  templateUrl: 'customer-logging.html',
})
export class CustomerLoggingPage {

  public menus: Array<any>;
  public selectedTab = 0;
  public babys: Array<any> = [];
  public newBabys: Array<any> = [];
  public remarks: string = "";
  public memberPhone: string = "";
  public memberName: string = "";
  public isDisabled: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoggingPage');
    if (this.navParams.data.type) {
      this.isDisabled = true;
      this.getCustomerInfo();
    }
  }

  // 新增宝宝信息
  addBaby() {
    // 判断是否超过三个宝宝
    if (this.babys.length === 3) {
      this.appService.toast('只能添加三个宝宝！');

      return;
    }
    // 跳转到宝宝页面
    this.navCtrl.push('BabyInfoPage', {
      animation: 'md-transition',
      // 传递一个回调参数
      callback: this.getBabyInfo
    });
  }

  // 从宝宝页面返回时候调用
  getBabyInfo = (data) => {
    return new Promise((resolve, reject) => {
      data.age = this.countAge(data.birthday) + "岁";
      if (this.navParams.data.type) {
        this.newBabys.push(data);
      }
      else {
        this.babys.push(data);
      }
    });
  }

  // 点击下一步
  nextStep() {
    if (this.checkName() && this.checkRemarks()) {
      // 验证手机
      this.phoneIsReg();
    }
  }

  // 计算岁数
  countAge(date) {
    let now = new Date()
    date = new Date(date);
    let age = Math.floor(Math.floor((now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24) / 365);

    return age;
  }

  // 判断手机号
  phoneIsReg() {
    // getPhone.api
    if (!this.checkPhone(this.memberPhone)) {
      return false;
    }
    // 判断是否编辑模式
    let babyArray = this.babys;
    let type = 0;
    if (this.navParams.data.type) {
      babyArray = this.newBabys;
      type = 1;
    }
    console.log(babyArray)
    this.appService.httpPost("getPhone.api", { phone: this.memberPhone }, (res) => {
      // 判断手机是否被注册
      // 进入标签选择页面
      if (res.code == 1 || type) {
        this.navCtrl.push('CustomerLoggingTabsPage', {
          animation: 'md-transition',
          memberData: {
            "remarks": this.remarks,
            "memberPhone": this.memberPhone,
            "memberName": this.memberName,
            "babys": babyArray
          },
          type: type
        });
      }
      else {
        this.appService.toast(res.msg);
        return false;
      }
    }, true);
  }

  // 检查手机格式
  checkPhone(phone) {
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      this.appService.toast('请输入正确的手机号码！');
      return false;
    }
    return true;
  }

  // 检查姓名
  checkName() {
    if (this.memberName.length > 15) {
      this.appService.toast('顾客姓名不能超过15个字！');
      return false;
    }
    if (this.memberName.length <= 0) {
      this.appService.toast('请输入顾客姓名！');
      return false;
    }
    return true;
  }

  // 检查备注
  checkRemarks() {
    if (this.remarks.length > 200) {
      this.appService.toast('备注不能超过两百个字！');
      return false;
    }
    return true;
  }

  // 获取顾客信息
  getCustomerInfo() {
    this.appService.httpPost('findMemberDetails.api', {
      memberPhone: this.navParams.data.memberPhone,
    }, (res) => {
      if (res.code == 1) {
        this.memberPhone = res.memberPhone;
        this.memberName = res.memberName;
        this.babys = res.babys;
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true)
  }

  // 编辑宝宝信息
  editBaby(index) {
    if (!this.navParams.data.type) {
      this.navCtrl.push('BabyInfoPage', {
        animation: 'md-transition',
        // 传递一个回调参数
        callback: this.editBabyDone,
        type: true,
        index: index,
        baby: this.babys[index]
      });
    }
  }

  // 修改宝宝信息完成后
  editBabyDone = (baby) => {
    return new Promise((resolve, reject) => {
      if (baby.del) {
        this.babys.splice(baby.index, 1);
        return;
      }
      baby.age = this.countAge(baby.birthday) + "岁";
      this.babys[baby.index] = baby;
    });
  }

  // 编辑宝宝信息
  editBabyInEditMode(index) {
    this.navCtrl.push('BabyInfoPage', {
      animation: 'md-transition',
      // 传递一个回调参数
      callback: this.editBabyInEditModeDone,
      type: true,
      index: index,
      baby: this.newBabys[index]
    });
  }

  // 修改宝宝信息完成后
  editBabyInEditModeDone = (baby) => {
    return new Promise((resolve, reject) => {
      if (baby.del) {
        this.newBabys.splice(baby.index, 1);
        return;
      }
      baby.age = this.countAge(baby.birthday) + "岁";
      this.newBabys[baby.index] = baby;
    });
  }


}
