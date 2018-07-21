import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the BusinessCourseSerachPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-course-serach',
  templateUrl: 'business-course-serach.html',
})
export class BusinessCourseSerachPage {
  // 搜索字段
  public searchTitle: string = "";
  // 搜索历史
  public searchHistory: Array<any> = [];
  // 是否展示搜索历史
  public showHistory: boolean = true;
  // 搜索结果列表
  public coursesList: Array<any> = [];
  // 课程类型数组
  public coursesType: Array<any> = [];
  public coursesTypeColors: Array<any> = [];
  // 能否搜索
  public canDoSearch: boolean = true;
  // 是否有下一页
  public hasNextPage: boolean = false;
  // 获取行数
  public rows: number = 20;
  // 页数
  public page: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appService: AppService,
    public appUrl: AppGlobal) {
  }

  ionViewDidLoad() {
    this.getSearchHistory();
  }

  // 搜索
  search() {
    this.page = 1;
    this.coursesList = [];
    // 设置不能搜索
    this.canDoSearch = false;
    // 隐藏历史记录
    this.showHistory = false;

    this.getCourses(1);
    this.recordSearchHistory();
  }

  // 取消搜索
  cancelModal() {
    this.navCtrl.pop({
      animation: 'md-transition'
    });
  }

  // 获取课程
  getCourses($event) {
    this.appService.httpPost("business_getCourses", {
      title: this.searchTitle,
      page: this.page,
      rows: this.rows
    }, (res) => {
      if (res.code == 1) {
        // 获取数据
        this.coursesList = this.coursesList.concat(res.map.listMap);
        // 随机颜色
        this.colorTag(res.map.listMap);
        // 可以继续搜索
        this.canDoSearch = true;
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
        // 可以继续搜索
        this.canDoSearch = true;
        // 加载更多完成
        if ($event != 1) {
          $event.complete();
        }
      }
    }, !this.hasNextPage)
  }

  // 获取历史搜索记录
  getSearchHistory() {
    this.appService.getItem("searchHistory", (obj) => {
      if (obj != 1) {
        this.searchHistory = obj;
      }
      else {
        this.searchHistory = ["", "", "", "", "", "", "", ""];
      }
    });
  }

  // 记录搜索记录
  recordSearchHistory() {
    let index = this.searchHistory.indexOf(this.searchTitle);
    // 如果记录已经有了，把他提到最前面
    if (index != -1) {
      let temp = this.searchHistory.splice(index, 1);
      this.searchHistory.unshift(temp);
    }
    // 没有记录就删除最后一条，然后将新纪录加在最前面
    else if (this.searchTitle) {
      this.searchHistory.pop();
      this.searchHistory.unshift(this.searchTitle);
    }
    // 存储在本地
    this.appService.setItem("searchHistory", this.searchHistory);
  }

  // 给标签添加颜色
  colorTag(list) {
    for (let i = 0; i < list.length; i++) {
      if (this.coursesType.indexOf(list[i]['courseType']) == -1) {
        this.coursesType.push(list[i].courseType);
      }
    }
    for (let i = this.coursesTypeColors.length; i < this.coursesType.length; i++) {
      this.getColor(this.coursesTypeColors);
    }
  }

  // 随机颜色
  getColor(arr) {
    let newColor = "rgba(" + (Math.random() * 100 + 100) + "," + (Math.random() * 100 + 100) + "," + (Math.random() * 100 + 100) + ",1)";
    if (arr.indexOf(newColor) != -1) {
      this.getColor(arr);
    }
    else {
      arr.push(newColor);
    }
  }

  // 加载更多数据
  getMoreData($event) {
    this.page++;
    this.getCourses($event);
  }

  // 展开详情页
  goToCourseDetail(id) {
    this.navCtrl.push('BusinessCourseDetailPage', { id: id });
  }
}
