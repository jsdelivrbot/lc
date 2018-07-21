import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the SalesStatisticsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-statistics-detail',
  templateUrl: 'sales-statistics-detail.html',
})
export class SalesStatisticsDetailPage {
  // 本身的storeId
  public storeId:any;
  
   //销售数据
   public salesData = [];
   //saleQty: 数量总数
   public saleQty;
   // saleAmount
   public saleAmount;
   // 商品id
   public goodsId;
   public startDate;
   public endDate;
   public dateTag;
   

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appService: AppService,
    public loadingCtrl: LoadingController) {
    this.goodsId = navParams.get('goodsId');
    // console.log(this.goodsId);
    this.startDate = navParams.get('sDate');
    this.endDate = navParams.get('eDate');
    this.dateTag = navParams.get('dateTag');

    this.appService.getItem('curStore',val=>{
      this.storeId=val['id']
      // console.log(this.storeId)
    })
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.salesDetail();
   

  }

  // 获取详情数据
  salesDetail(){
    this.appService.httpPost('findCasPosSaleDtl.api',
    {
      storeId: this.storeId, 
      goodsId: this.goodsId,
      dateTag: this.dateTag,
      startDate: this.startDate,
      endDate: this.endDate
    },data=>{
      console.log(data['data']);
      this.salesData = data['data'];
      this.saleQty = data['saleQty'];
      this.saleAmount = data['saleAmount'];
    })
  }

  

  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 1000
    });
    loader.present();
  }

}
