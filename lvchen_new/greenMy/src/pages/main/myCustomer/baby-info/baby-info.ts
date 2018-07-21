import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BabyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-baby-info',
  templateUrl: 'baby-info.html',
})
export class BabyInfoPage {

  // 用来保存上个页面传过来的回调函数
  public callback: any;
  public babySex: number = 0;
  public babyName: string;
  public birthday: string = "";
  public maxDate: string = new Date().toISOString().split("T")[0].toString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
    this.maxDate = new Date().toISOString().split("T")[0].toString();
  }

  ionViewDidLoad() {
    // 拿到上个页面的回调函数
    this.callback = this.navParams.get('callback');
    if (this.navParams.data.type) {
      let baby = this.navParams.data.baby;
      this.babyName = baby.babyName;
      this.babySex = baby.babySex;
      this.birthday = baby.birthday;
    }
  }

  // 离开页面时候调用
  ionViewWillLeave() {
  }

  // 选择性别
  changeSex(sex) {
    this.babySex = sex;
  }

  // 确定
  confirm() {
    if (!this.birthday) {
      this.appService.alert("请选择宝宝生日！");
      return;
    }
    // 返回宝宝的信息，调用上个页面的回调函数
    this.callback({
      babyName: this.babyName || "",
      babySex: this.babySex,
      birthday: this.birthday,
      index: this.navParams.data.index
    });

    this.navCtrl.pop();
  }

  // 删除宝宝
  delBaby() {
    this.callback({
      del: true,
      index: this.navParams.data.index
    });

    this.navCtrl.pop();
  }
}
