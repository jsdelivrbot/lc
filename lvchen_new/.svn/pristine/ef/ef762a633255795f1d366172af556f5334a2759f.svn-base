import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the OweCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owe-count',
  templateUrl: 'owe-count.html',
})
export class OweCountPage {
  // 当前业务组名称和id
  public storeName: string = "业务组";
  public storeId: number = 1;
  // 商品id
  public goodsId: number = -1;
  // 下一级业务组
  public nextOrg: Array<any> = [];
  // 当前数据
  public thisDataArr: Array<any> = [];
  // 合计
  public oweMemberCount: number = 0;
  public oweStorerCount: number = 0;
  // 是门店还是业务组
  public isStore: boolean = true;

  identity = 0; //-1业务员，1员工，2、3导购
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    private alertCtrl: AlertController) {
    this.appService.getItem('userInfo', val => {
      this.identity = val['tag'];
    })
  }

  ionViewDidLoad() {
    // 判断是否二级页面
    if (this.navParams.data.goodsName) {
      this.storeName = this.navParams.data.goodsName;
      this.goodsId = this.navParams.data.goodsId;
      this.storeId = this.navParams.data.storeId;
      this.identity = 2;
      this.isStore = this.navParams.data.isStore;
      this.getDetail();
    }
    else {
      // 获取业务组名称
      this.appService.getItem("curStore", (obj) => {
        this.storeName = obj.storeName;
        this.storeId = obj.id;
      });
      // 获取业务组
      this.getNextOrg();
      // 获取当前数据
      this.getThisData();
    }
  }

  // 获取当前数据
  getThisData() {
    this.appService.httpPost("findOwningGoods.api", {}
      , (res) => {
        if (res.code == 1) {
          this.thisDataArr = res.data;
          // 计算合计
          this.oweStorerCount = this.oweMemberCount = 0;
          for (let i = 0; i < this.thisDataArr.length; i++) {
            this.oweStorerCount += this.thisDataArr[i].oweStore;
            this.oweMemberCount += this.thisDataArr[i].oweMember;
          }
        }
        else {
          this.appService.alert(res.msg);
        }
      }, true);
  }

  // 获取下级业务组数据
  getOtherOrgData(storeId) {
    this.appService.httpPost("findOwningGoods.api", {
      storeId
    }, (res) => {
      if (res.code == 1) {
        this.thisDataArr = res.data;
        // 计算合计
        this.oweStorerCount = this.oweMemberCount = 0;
        for (let i = 0; i < this.thisDataArr.length; i++) {
          this.oweStorerCount += this.thisDataArr[i].oweStore;
          this.oweMemberCount += this.thisDataArr[i].oweMember;
        }
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true);
  }

  // 获取下一级业务组
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
      }, true);
  }

  // 选择下一级
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
              this.getOtherOrgData(data[0]);
              this.storeName = data[1];
            }
          }
        }
      ]
    });
    alert.present();
  }

  // 查看详情
  showDetail(goodsName, goodsId) {
    if (this.identity == 2 || this.identity == 3) {
      return;
    }
    this.navCtrl.push(OweCountPage, {
      goodsName,
      goodsId,
      storeId: this.storeId,
      isStore: this.nextOrg.length > 0
    });
  }

  // 获取详情
  getDetail() {
    this.appService.httpPost("findOwningGoodsDtl.api", {
      storeId: this.storeId,
      goodsId: this.goodsId
    }, (res) => {
      if (res.code == 1) {
        this.thisDataArr = res.data;
        this.oweMemberCount = res.oweMember;
        this.oweStorerCount = res.oweStore;
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true)
  }
}
