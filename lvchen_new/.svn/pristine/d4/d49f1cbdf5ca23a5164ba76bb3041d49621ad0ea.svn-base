import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

/**
 * Generated class for the BorrowDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borrow-detail',
  templateUrl: 'borrow-detail.html',
})
export class BorrowDetailPage {
  @ViewChild(Content)content:Content;
  protected i=1;
  protected repayDetailArray:Array<any>;
  protected page=1;
  protected hasMore=true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apps:AppService) {
  }

  ionViewDidLoad() {
    this.apps.httpPost('findBorrowStati.api',
      {
      mark:1,
      orgId:'',
      page:this.page},
    data=>{
      if(data.code==1){
        this.repayDetailArray=data.data||[];
      
        if(data.data.length<10){
          this.hasMore=false;
          this.apps.toast('数据加载完毕');
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
      this.apps.httpPost('findBorrowStati.api',
        {
        mark:num,
        orgId:'',
        page:this.page},
      data=>{
        if(data.code==1){
          this.repayDetailArray=data.data||[];
          if(data.data.length<10){
            this.hasMore=false;
            this.apps.toast('数据加载完毕');
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
    this.apps.httpPost('findBorrowStati.api',
      {mark:this.i,orgId:'',page:this.page},
    data=>{
      if(data.code==1){
        this.repayDetailArray=this.repayDetailArray.concat(data.data||[]);
        if(data.data.length<10){
          this.hasMore=false;
          this.apps.toast('数据加载完毕');
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
