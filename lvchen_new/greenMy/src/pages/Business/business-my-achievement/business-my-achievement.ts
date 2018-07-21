import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Navbar, LoadingController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessMyAchievementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-my-achievement',
  templateUrl: 'business-my-achievement.html',
})
export class BusinessMyAchievementPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Navbar) navBar: Navbar;
  public navIndex: number = 0;
  public topDetail: object = {};
  public ABottomIndex: number = 0;
  public hasExamArr: Array<any> = [];
  public noExamArr: Array<any> = [];
  public examRate: number = 0;
  public topDetail1: object = {};
  public BBottomIndex: number = 0;
  public hasStudyArr: Array<any> = [];
  public noStudyArr: Array<any> = [];
  public studyRate: number = 0;
  public loadingStatus: number = 0;
  public loadingIndicator;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop({
        animation: 'md-transition'
      });
    }
    this.loadingIndicator = this.loadingCtrl.create({ spinner: 'bubbles' });
    this.loadingIndicator.present();
    this.getATop();
    this.getBTop();
    this.getExam(0, 'noExamArr');
    this.getExam(1, 'hasExamArr');
    this.getCourse(0, 'noStudyArr');
    this.getCourse(1, 'hasStudyArr');
  }

  // 切换内容
  toggleSlide() {
    this.navIndex = this.slides.getActiveIndex();
    if (this.navIndex > 1) {
      this.navIndex = 1;
    }
    if (this.navIndex < 0) {
      this.navIndex = 0;
    }
  }

  // 切换导航
  toggleTab(index) {
    this.navIndex = index;
    this.slides.slideTo(index);
  }

  // 成就上半部分
  getATop() {
    this.appService.httpPost("findUserExamJson.api", {
    }, (res) => {
      if (res.code == 1) {
        this.topDetail = res.map;
        if (((res.map.examCount) * 1) == 0 || !res.map.examCount) {
          this.examRate = 0;
        }
        else {
          this.examRate = Math.floor(((res.map.passCount * 1) / (res.map.examCount) * 1) * 100);
        }
      }
      else {
        this.appService.alert(res.msg);
      }
      this.loadingData();
    }, false);
  }

  // 获取考试
  getExam(status, arr) {
    this.appService.httpPost("findMamBusinessExamJson.api", {
      status
    }, (res) => {
      console.log("考试", res);

      if (res.code == 1) {
        this[arr] = res.map.listMap;
      }
      else {
        this.appService.alert(res.msg);
      }
      this.loadingData();
    }, false);
  }

  // 学习上半部分
  getBTop() {
    this.appService.httpPost("findUserCourseJson.api", {
    }, (res) => {
      if (res.code == 1) {
        this.topDetail1 = res.map;
        if (((res.map.yesCount * 1) + (res.map.notCount * 1)) == 0) {
          this.studyRate = 0;
        }
        else {
          this.studyRate = Math.floor((res.map.yesCount * 1) / ((res.map.yesCount * 1) + (res.map.notCount * 1)) * 100);
        }
      }
      else {
        this.appService.alert(res.msg);
      }
      this.loadingData();
    }, false);
  }


  // 获取课程
  getCourse(status, arr) {
    this.appService.httpPost("findMamBusinessCourseJson.api", {
      status
    }, (res) => {
      console.log("课程", res);

      if (res.code == 1) {
        this[arr] = res.map.ListMap;
      }
      else {
        this.appService.alert(res.msg);
      }
      this.loadingData();
      
    }, false);
  }

  // 跳转到课程详情
  goToExam(id) {
    this.navCtrl.push('BusinessCourseDetailPage', { id: id });
  }

  // 加载状态
  loadingData() {
    this.loadingStatus++;
    if (this.loadingStatus == 4) {
      this.loadingIndicator.dismiss();
    }
  }
}
