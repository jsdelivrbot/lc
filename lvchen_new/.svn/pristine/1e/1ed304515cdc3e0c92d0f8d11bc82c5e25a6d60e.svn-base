import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessExamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-exam',
  templateUrl: 'business-exam.html',
})
export class BusinessExamPage {
  public page: number = 1;
  public rows: number = 10;
  public hasNextPage: boolean = false;
  public examList: Array<any> = [];
  public colorArr: Array<any> = ['#9167f2', '#008ff6', '#8bcb00', '#f35800', '#ff4189'];
  public titleText: string = "我要考试";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
    if (this.navParams.data.practice) {
      this.titleText = "智能练习";
    }
  }

  ionViewDidLoad() {
    this.getExam(1);
  }

  // 获取考试列表
  getExam($event) {
    this.appService.httpPost("business_getCourses", {
      page: this.page,
      rows: this.rows,
      isExam: 1
    }, (res) => {
      if (res.code == 1) {
        // 获取数据
        this.examList = this.examList.concat(res.map.listMap);
        // 判断是否有下一页
        if (res.map.listMap.length < this.rows) {
          this.hasNextPage = false;
        }
        else {
          this.hasNextPage = true;
        }
        // 加载更多完成
        if ($event != 1) {
          $event.complete();
        }
      }
      else {
        this.appService.alert(res.msg);
        // 加载更多完成
        if ($event != 1) {
          $event.complete();
        }
      }
    }, true)
  }

  // 跳到考试/练习详情
  goToExam(id, isSucc) {
    if (isSucc == 0) {
      this.appService.alert("请先完成课程学习！");
      return;
    }
    this.navCtrl.push('BusinessExamStartPage', {
      id: id,
      practice: this.navParams.data.practice
    });
  }

  // 获取下一页
  getMoreData($event) {
    this.page++;
    this.getExam($event);
  }
}
