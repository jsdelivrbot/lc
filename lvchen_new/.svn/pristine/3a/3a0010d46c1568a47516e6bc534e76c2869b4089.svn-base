import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessExamStartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-exam-start',
  templateUrl: 'business-exam-start.html',
})
export class BusinessExamStartPage {
  @ViewChild(Slides) slides: Slides;
  public id: number;
  public examDetail: object = {};
  public examing: boolean = false;
  public examId: number;
  // 题目数组
  public questionArr: Array<any> = [];
  // 答案数组
  public answerArr: Array<any> = [];
  // 当前题目索引
  public questionIndex: number = 0;
  public showAll: boolean = false;
  public showTip: boolean = false;
  public did: object = {};
  // 开始计时
  public readTimeLong: number = 0;
  public readSeconds: number = 0;
  public readHours: number = 0;
  public timer;
  // 是否最后一页
  public isLastPage: boolean = false;
  public checkResult: boolean = false;
  // 考试结果
  public testResult: object = {};
  // 查看模式
  public checkMode: boolean = false;
  // 考试还是练习
  public status: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    private alertCtrl: AlertController) {
    if (this.navParams.data.practice) {
      this.status = 0;
    }
  }

  ionViewDidLoad() {
    this.id = this.navParams.data.id || 57;
    this.getExamDetail();
  }

  // 离开时清除倒数的计时器
  ionViewWillLeave() {
    clearTimeout(this.timer);
  }

  // 获取考试详情
  getExamDetail() {
    this.appService.httpPost("business_courseDetail", {
      courseId: this.id
    }, (res) => {
      if (res.code == 1) {
        this.examId = res.map.examId;
        this.appService.httpPost("getMamBusinessExam.api", {
          examId: this.examId
        }, (res) => {
          if (res.code == 1) {
            this.examDetail = res.map;
            this.readTimeLong = res.map.examTimeLong;
          }
          else {
            this.appService.alert(res.msg);
          }
        }, true);
      }
      else {
        this.appService.alert(res.msg);
      }
    }, true);
  }

  // 抽取考试题目
  getQuestion() {
    this.appService.httpPost("findStartTestJson.api", {
      examId: this.examId
    }, (res) => {
      if (res.code == 1) {
        this.questionArr = res.map.listMap;
      }
      else {
        this.appService.alert(res.msg);
        this.navCtrl.pop();
      }
    }, true);
  }

  // 开始考试
  startExam() {
    let title = '是否确认开始考试？'
    let message = '中途不能暂停，中途返回考试作废，提交考卷后不能撤回。';
    if (this.navParams.data.practice) {
      title = '是否确认开始练习？'
      message = '中途不能暂停，中途返回考试作废，练习分数不算入考试分数。';
    }
    let alert = this.alertCtrl.create({
      title,
      message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.examing = true;
            this.getQuestion();
            this.showTip = true;
            this.countTime();
          }
        }
      ]
    });
    alert.present();
  }

  // 选择题目
  selectQuestion(i) {
    this.slides.slideTo(i, 500);
  }

  // 保存选择的答案
  selectAnswer(index, answerId, subjectId, type) {
    if (this.checkMode) {
      return;
    }
    this.answerArr[index] = {
      answerId,
      subjectId,
      type: type == 0 ? false : true
    }
    this.did[index] = true;
  }

  // 滑动题目
  slideChanged() {
    this.questionIndex = this.slides.getActiveIndex();
    if (this.questionIndex > (this.questionArr.length - 1)) {
      this.questionIndex = this.questionArr.length - 1;
    }
    if (this.questionIndex == (this.questionArr.length - 1)) {
      this.isLastPage = true;
      this.showAll = false;
    }
    else {
      this.isLastPage = false;
    }
  }

  // 开始计时
  countTime() {
    if (this.readSeconds == 59 && this.readTimeLong == 9 && this.readHours == 0) {
      this.appService.toast("离考试结束还剩下10分钟，请抓紧时间，考试结束将直接提交考卷！");
    }
    this.readSeconds--;
    if (this.readSeconds < 0) {
      this.readTimeLong--;
      if (this.readTimeLong < 0) {
        this.readHours--;
        if (this.readHours < 0) {
          // 强制提交试卷
          let alert = this.alertCtrl.create({
            title: '考试时间到！',
            message: '是否确定提交试卷？提交后不能撤回！',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: '取消',
                handler: () => {
                  this.navCtrl.pop();
                }
              },
              {
                text: '确定',
                handler: () => {
                  this.handelAnswerArr();
                  this.appService.httpPost("editSubmitExam.api", {
                    examId: this.examId,
                    subjectMore: JSON.stringify(this.answerArr),
                    status: this.status
                  }, (res) => {
                    if (res.code == 1) {
                      this.testResult = res.map;
                      this.checkResult = true;
                    }
                    else {
                      this.appService.alert(res.msg);
                      this.navCtrl.pop();
                    }
                  }, true)
                }
              }
            ]
          });
          alert.present();
          return;
        }
        this.readTimeLong = 59;
      }
      this.readSeconds = 59;
    }
    this.timer = setTimeout(() => {
      this.countTime();
    }, 1000);
  }

  // 提交考卷
  finishExam() {
    clearTimeout(this.timer);
    let alert = this.alertCtrl.create({
      title: '确认提交',
      message: '是否确定提交试卷？提交后不能撤回！',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.countTime();
          }
        },
        {
          text: '确定',
          handler: () => {
            this.handelAnswerArr();
            this.appService.httpPost("editSubmitExam.api", {
              examId: this.examId,
              subjectMore: JSON.stringify(this.answerArr),
              status: this.status
            }, (res) => {
              if (res.code == 1) {
                this.testResult = res.map;
                this.checkResult = true;
              }
              else {
                this.appService.alert(res.msg);
                this.navCtrl.pop();
              }
            }, true)
          }
        }
      ]
    });
    alert.present();
  }

  checkSelectedAnswer(id) {
    for (let i = 0; i < this.answerArr.length; i++) {
      if (this.answerArr[i] != undefined) {
        if (this.answerArr[i].answerId == id) {
          return true;
        }
      }
    }
    return false;
  }

  checkIsRight(item) {
    for (let i = 0; i < this.answerArr.length; i++) {
      if (this.answerArr[i].subjectId == item.id && this.answerArr[i].type == true) {
        if (this.checkMode) {
          return true;
        }
      }
    }
    return false;
  }

  checkRightOrWrong(item) {
    if (!this.checkMode) {
      return 'none';
    }
    if (item.isRight == 1) {
      return 'url(./assets/imgs/right.png)';
    }
    for (let i = 0; i < this.answerArr.length; i++) {
      if (this.answerArr[i].answerId == item.id) {
        return 'url(./assets/imgs/wrong.png)';
      }
    }
    return 'none';
  }

  checkRightOrWrong1(item) {
    if (!this.checkMode) {
      return 'none';
    }
    if (item.isRight == 1) {
      return 'transparent';
    }
    for (let i = 0; i < this.answerArr.length; i++) {
      if (this.answerArr[i].answerId == item.id) {
        return 'transparent';
      }
    }
    return 'none';
  }

  // 查看我的考卷
  checkMyExam() {
    this.slides.slideTo(0, 1);
    this.checkMode = true;
  }

  //处理答案数组
  handelAnswerArr() {
    for (let i = 0, len = this.answerArr.length; i < len; i++) {
      if (!this.answerArr[i] || this.answerArr[i] == undefined || this.answerArr[i] === null) {
        this.answerArr.splice(i, 1);
        len--;
        i--;
      }
    }
  }
}
