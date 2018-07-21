import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the CustomerReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-return',
  templateUrl: 'customer-return.html',
})
export class CustomerReturnPage {
  public phone='';
  public customerData:Array<any>=[];
  public customerReturnListDetail='CustomerReturnListDetailPage';
  public page:number=0;
  public hasmore=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService,
    private event: Events,
    private keyboard: Keyboard,
    public platform: Platform,) {
     
  }
 
  ionViewDidLoad() {
    this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
  }

  onKeyboard($event){
    if($event.key=='Enter'){
      this.onSearch();
    }
  }

  onSearch(){
    if (this.phone.length != 11) {
      this.appService.toast("请输入正确的手机号码");
      return; 
    }
    this.appService.httpPost('customerReturn.api',
        {
          phone: this.phone,
        },data=>{
       if(data.code==1){
        if (data.data.length == 0) {
          this.appService.toast("没有查询到数据");
        }
        if(data.data.length>=10){
          this.hasmore=true;
          this.page++
        }else{
          this.hasmore=false;
        }
        this.customerData=data.data;
       }else{
        this.appService.alert(data.msg);
       }
      },true)
  }

  getMoreData($event){
    this.appService.httpPost('customerReturn.api',{phone: this.phone,page:this.page},data=>{
      if(data.code==1){
        if(data.data.length>=10){
          this.hasmore=true;
          this.page++
        }else{
          this.hasmore=false;
        }
        $event.complete();
        this.customerData=this.customerData.concat(data.data)
       }else{
        this.appService.alert(data.msg);
       }
     
    })
  }
 
}
