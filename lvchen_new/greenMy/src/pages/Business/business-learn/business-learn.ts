import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Navbar } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessLearnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-learn',
  templateUrl: 'business-learn.html',
})
export class BusinessLearnPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Navbar) navBar: Navbar;
  public pageTitle: string = "我要学习";
  // 选中的导航
  public navIndex: number = 0;
  // 是否有下一页
  public hasNextCourse: boolean = false;
  public hasNextExam: boolean = false;
  // 获取行数
  public rows: number = 20;
  // 页数
  public coursePage: number = 1;
  public examPage: number = 1;
  // 搜索结果列表
  public coursesList: Array<any> = [];
  public examList: Array<any> = [];
  // 课程类型数组
  public coursesType: Array<any> = [];
  public coursesTypeColors: Array<any> = [];
  // 第一次获取需要考试的课程
  public firstGetExam: boolean = true;
  // 筛选的课程id
  public courseTypeId: number = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public appUrl: AppGlobal) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop({
        animation: 'md-transition'
      });
    }
    this.getCourses(1);
    this.getCourseType();
  }

  // 切换导航
  toggleTab(index) {
    this.navIndex = index;
    this.slides.slideTo(index);
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
    if (this.firstGetExam && this.navIndex == 1) {
      this.getCourses(1);
      this.firstGetExam = false;
    }
  }

  // 获取课程
  getCourses($event) {
    this.appService.httpPost("business_getCourses", {
      page: this.navIndex == 0 ? this.coursePage : this.examPage,
      rows: this.rows,
      isExam: this.navIndex,
      courseTypeId: this.courseTypeId
    }, (res) => {
      if (res.code == 1) {
        // 获取无考试的课程
        if (this.navIndex == 0) {
          // 获取数据
          this.coursesList = this.coursesList.concat(res.map.listMap);
          // 判断是否有下一页
          if (res.map.listMap.length < this.rows) {
            this.hasNextCourse = false;
          }
          else {
            this.hasNextCourse = true;
          }
        }
        // 获取有考试的课程
        if (this.navIndex == 1) {
          // 获取数据
          this.examList = this.examList.concat(res.map.listMap);
          // 判断是否有下一页
          if (res.map.listMap.length < this.rows) {
            this.hasNextExam = false;
          }
          else {
            this.hasNextExam = true;
          }
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
    }, this.navIndex == 0 ? this.coursesList.length <= 0 : this.examList.length <= 0)
  }

  // 获取课程类型
  getCourseType() {
    this.appService.httpPost("business_courseType", {}, (res) => {
      if (res.code == 1) {
        this.coursesType = res.map.rs;
        // 添加颜色
        this.colorTag(this.coursesType);
      }
      else {
        this.appService.alert(res.msg);
      }
    });
  }

  // 加载更多
  getMoreData($event) {
    this.navIndex == 0 ? this.coursePage++ : this.examPage++;
    this.getCourses($event);
  }

  // 给标签添加颜色
  colorTag(list) {
    for (let i = 0; i < list.length; i++) {
      this.getColor(this.coursesTypeColors);
    }
  }

  // 随机颜色
  getColor(arr) {
    let newColor = "rgba(" + (Math.random() * 205 + 50) + "," + (Math.random() * 100 + 50) + "," + (Math.random() * 150 + 50) + ",1)";
    if (arr.indexOf(newColor) != -1) {
      this.getColor(arr);
    }
    else {
      arr.push(newColor);
    }
  }

  // 返回颜色字符串
  returnColor(tag) {
    for (let i = 0; i < this.coursesType.length; i++) {
      if (this.coursesType[i].text == tag) {
        return this.coursesTypeColors[i];
      }
      let children = this.coursesType[i].children;
      for (let j = 0; j < children.length; j++) {
        if (children[j].text == tag) {
          return this.coursesTypeColors[i];
        }
      }
    }
  }

  // 显示所有类型
  showFunnel() {
    let funnel = document.getElementById("funnel");
    let ionNabbar = document.getElementById("ionNabbar");
    this.pageTitle = this.pageTitle == "筛选" ? "我要学习" : "筛选";
    if (this.pageTitle == "筛选") {
      funnel.style.top = ionNabbar.offsetHeight + "px";
    }
    else {
      funnel.style.top = '';
    }
  }

  // 通过类型筛选
  searchByID(id) {
    this.courseTypeId = this.courseTypeId == id ? null : id;
    this.showFunnel();
    this.hasNextCourse = false;
    this.hasNextExam = false;
    this.coursePage = 1;
    this.examPage = 1;
    this.coursesList = [];
    this.examList = [];
    this.firstGetExam = true;
    this.toggleTab(0);
    this.getCourses(1);
  }

  // 展开详情页
  goToCourseDetail(id) {
    this.navCtrl.push('BusinessCourseDetailPage', { id: id }, {
      animation: 'md-transition'
    })
  }
}
