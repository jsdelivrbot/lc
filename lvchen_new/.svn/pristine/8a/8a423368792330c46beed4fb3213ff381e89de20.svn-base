import { Component } from '@angular/core';


import { NavController } from 'ionic-angular';


import { IonicPage } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public creditDetail = 'CreditDetailPage';
  public saleDetail = 'SaleDetailPage';
  public borrowDetail = 'BorrowDetailPage';
  public shoopersRanking = 'ShoppersRankingPage';
  public storeRanking = 'StoreRankingPage';
  public zoneRanking = 'ZoneRankingPage';
  public salesStatistics = 'SalesStatisticsPage';
  public consignStatistics = 'ConsignStatisticsPage';
  public presentStatistics = 'PresentStatisticsPage';
  public oweCountPage = 'OweCountPage';
  public salesPerformancePage = 'SalesPerformancePage';

  identity = 0; //-1业务员，1员工，2、3导购
  // 当月销售额
  public Themonth: number = 0;
  public ThemonthWang: string = "0";
  // 当月与上月对比
  public ThematchSales: number = 0;
  // 销售额环比
  public TheproporSales: number = 0;
  // 顾客人数
  public ThenewConsume: number = 0;
  public ThenewConsumeWang: string = "0";
  // 当月与上月比
  public ThematchConsume: number = 0;
  // 顾客人数环比
  public TheproporConsume: number = 0;

  public scrollHeight;
  constructor(
    public apps: AppService,
    public navCtrl: NavController
  ) {
    this.apps.getItem('userInfo', val => {
      this.identity = val['tag'];
    })
  }
  ionViewWillEnter() {
    this.apps.httpPost('businessAnalysis_index.api', {}, data => {
      this.Themonth = data.data.nowSales || 0;
      this.ThemonthWang = this.toDecimal2(this.Themonth/10000);
      this.ThematchSales = data.data.matchSales || 0;
      this.TheproporSales = data.data.proporSales || 0;
      this.ThenewConsume = data.data.newConsume || 0;
      this.ThenewConsumeWang = this.toDecimal2(this.ThenewConsume/10000);
      this.ThematchConsume = data.data.matchConsume || 0;
      this.TheproporConsume = data.data.proporConsume || 0;
      this.scrollHeight = document.getElementsByClassName('grantMarket')[0].clientHeight-329;
      console.log(this.scrollHeight);
    })
  }
  /**
 * @author linyunfu by 2018-5-28
 * @method  pkGame pk赛跳转
 * @param {} 
 * @return {void} 无返回值
 */
  pkGame(): void {
    this.navCtrl.push('PkGamePage', {}, { animation: 'md-transition' })
  }
  targetGame(): void {
    this.navCtrl.push('TargetGamePage', {}, { animation: 'md-transition' })
  }

  toDecimal2(x) {
    let f = parseFloat(x);
    if (isNaN(f)) {
      return "0";
    }
    f = Math.round(x * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
}
