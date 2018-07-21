import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessMyCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-my-course',
  templateUrl: 'business-my-course.html',
})
export class BusinessMyCoursePage {
  public page: number = 1;
  public rows: number = 20;
  public myCourses: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    public appUrl: AppGlobal) {
  }

  ionViewDidEnter() {
    this.getMyCourse();
  }

  // 获取轮播图和新课程
  getMyCourse() {
    this.appService.httpPost("business_index.api", {}, (res) => {
      if (res.code == 1) {
        let map = res.map;
        // 获取我的收藏
        if (map.collCourse && map.collCourse !== "") {
          this.myCourses = map.collCourse;
        }
        else{
          this.myCourses = [];
        }
      }
      else {
        this.appService.alert(res.msg);
      }
    });
  }

  // 展开详情页
  goToCourseDetail(id) {
    this.navCtrl.push('BusinessCourseDetailPage', { id: id });
  }
}
