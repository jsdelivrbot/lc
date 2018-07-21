import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the SaleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-detail',
  templateUrl: 'sale-detail.html',
})
export class SaleDetailPage {
  @ViewChild(Content)content:Content;
  protected i=1;
  protected saleDetailArray:Array<any>;
  protected page=1;
  protected hasMore=true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apps:AppService) {
  }

  ionViewDidLoad() {
    this.apps.httpPost('findCasPosSaleDetail.api',
      {mark:1,orgId:''},
    data=>{
      console.log(data)
      if(data.code==1){
        this.saleDetailArray=data.data||[];
      
        if(data.data.length<10){
          this.hasMore=false;
          this.apps.toast('数据加载完毕')
        }else{
          this.page=2;
          this.hasMore=true;
        }
      }else{
        this.apps.toast(data.msg)
      }
    })
    console.log('ionViewDidLoad CreditDetailPage');
  }
  dataSelect(num:number):void{
    if(this.i==num){
      this.i=num;
      return;
    }else{
      this.content.scrollToTop(0)
      this.i=num;
      this.page=1;
      this.apps.httpPost('findCasPosSaleDetail.api',
        {
        mark:num,
        orgId:'',
        page:this.page},
      data=>{
        if(data.code==1){
          this.saleDetailArray=data.data||[];
          console.log(data.data.length)
          if(data.data.length<10){
            this.hasMore=false;
            this.apps.toast('数据加载完毕')
          }else{
            this.page=2;
            this.hasMore=true;
          }
        }else{
          this.apps.toast(data.msg)
        }
      })
    }
  }
  doInfinite($event){
    this.apps.httpPost('findCasPosSaleDetail.api',
      {
      mark:this.i,
      orgId:'',
      page:this.page},
    data=>{
      if(data.code==1){
        this.saleDetailArray=this.saleDetailArray.concat(data.data||[]);
        if(data.data.length<10){
          this.hasMore=false;
          this.apps.toast('数据加载完毕')
        }else{
          this.page++;
          this.hasMore=true;
        }
        $event.complete();
      
      }else{
        this.apps.toast(data.msg)
      }
    })
  }

}
