import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the PresentGiftDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-present-gift-detail',
  templateUrl: 'present-gift-detail.html',
})
export class PresentGiftDetailPage {
    // 本身的storeId
    public storeId:any;
    public goodsId;
    public groupGiftNum = [];
    public sum: number;
    public startDate;
    public endDate;
    public dateTag;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public appService: AppService,
     public loadingCtrl: LoadingController) {
    this.goodsId = navParams.get('goodsId');
    this.startDate = navParams.get('startDate');
    this.endDate = navParams.get('endDate');
    this.dateTag = navParams.get('dateTag');

    console.log(navParams.data);

    this.appService.getItem('curStore',val=>{
      this.storeId=val['id']
      //console.log(this.storeId)
    })
  }

  ionViewDidLoad() {
    //console.log(this.goodsId);
    // console.log(this.startDate);
    // console.log(this.endDate);
    // console.log(this.dateTag);
    // console.log()
    this.presentLoading();
    this.findGiftDtl();
  }

  
  findGiftDtl(dateTag?, startDate?, endDate?) {
    this.appService.httpPost('findGiftDtl.api', 
    { 
      storeId: this.storeId, 
      goodsId: this.goodsId,
      dateTag: this.dateTag,
      startDate: this.startDate,
      endDate: this.endDate
    }, 
    data => {
      console.log(data['data']);
      this.groupGiftNum = data['data'];
      this.sum = data['saleQty'];
      //console.log(data['saleQty']);

    })
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 1000
    });
    loader.present();
  }
}
