import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessCourseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-business-course-detail',
  templateUrl: 'business-course-detail.html',
})
export class BusinessCourseDetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  // 课程详情
  public courseDetail: object = {};
  // 考试id
  public examId: number = 0;
  // 是否已收藏
  public collState: number = 0;
  // 文件类型
  public fileRoute: number = 2;
  // 是否需要考试
  public examState: number = 1;
  // 是否已经学习
  public studyState: number = 0;
  // 开始学习
  public studing: boolean = false;
  public readTimeLong: number = 0;
  public readSeconds: number = 0;
  public readHours: number = 0;
  // 定时器
  public timer;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public appUrl: AppGlobal) {
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      clearTimeout(this.timer);
      this.navCtrl.pop({
        animation: 'md-transition'
      });
    }
    this.getCourseDetail();
  }

  // 获取课程详情
  getCourseDetail() {
    this.appService.httpPost("business_courseDetail", {
      courseId: this.navParams.data.id || 56
    }, (res) => {
      if (res.code == 1) {
        this.courseDetail = res.map.course;
        this.collState = res.map.collState;
        this.examState = res.map.examState;
        this.studyState = res.map.studyState;
        this.examId = res.map.examId;
        // 判断文件类型
        this.judgefileRoute(res.map.course.fileRoute);
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true);
  }

  // 判断课程文件类型
  judgefileRoute(fileRoute: string) {
    if (fileRoute.toLocaleLowerCase().indexOf(".mp3") != -1 || fileRoute.toLocaleLowerCase().indexOf(".amr") != -1) {
      this.fileRoute = 0;
    }
    else if (fileRoute != "") {
      this.fileRoute = 1;
    }
  }

  // 收藏
  collCourse(id) {
    // 修改当前收藏状态
    this.collState = this.collState == 1 ? 0 : 1;
    // 提交收藏状态
    this.appService.httpPost("business_courseColl", {
      courseId: this.navParams.data.id || 56,
      collState: this.collState
    }, (res) => {
      this.appService.alert(res.msg);
      // 失败的话，改回原来的收藏状态
      if (res.code != 1) {
        this.collState = this.collState == 1 ? 0 : 1;
      }
    }, true);
  }

  // 我要学习
  startTolearn() {
    this.studyState = 1;
    // 计算分钟
    this.readTimeLong = this.courseDetail["readTimeLong"] % 60;
    // 计算小时
    this.readHours = Math.floor(this.courseDetail["readTimeLong"] / 60);
    this.studing = true;
    this.startCountDown();
  }

  // 学习倒数
  startCountDown() {
    this.readSeconds--;
    if (this.readSeconds < 0) {
      this.readTimeLong--;
      if (this.readTimeLong < 0) {
        this.readHours--;
        if (this.readHours < 0) {
          this.appService.httpPost("business_courseSucc", {
            courseId: this.navParams.data.id || 56,
            isSucc: 1
          }, (res) => {
            if (res.code == 1) {
              this.appService.alert(res.msg);
            }
            else {
              this.studyState = 0;
              this.appService.alert(res.msg);
            }
          });
          this.studing = false;
          return;
        }
        this.readTimeLong = 59;
      }
      this.readSeconds = 59;
    }
    this.timer = setTimeout(() => {
      this.startCountDown();
    }, 1000);
  }

  // 我要考试
  startExam() {
    if (this.studyState == 0 || this.studing) {
      this.appService.alert("请先完成学习！");
      return;
    }
    this.navCtrl.push('BusinessExamStartPage', {
      id: this.courseDetail['id']
    });
  }

}
