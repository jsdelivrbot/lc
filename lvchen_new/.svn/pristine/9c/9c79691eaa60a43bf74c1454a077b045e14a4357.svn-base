import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

/**
 * Generated class for the CustomerInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-info',
  templateUrl: 'customer-info.html',
})
export class CustomerInfoPage {
  @ViewChild(Navbar)navbar:Navbar;
  public posSaleIds:"";
  public memo:string='';
  public customer={
    phone:'',
    smsCode:'',
    memo:'',   
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public appService: AppService) {
    this.posSaleIds=this.navParams.get('posSaleIds');
    this.customer.phone = this.navParams.get('phone');
  }

  submit(){
    if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.customer.phone)){
      this.appService.alert('手机号码不合法')
    }else{
      this.appService.httpPost('refundOrderSubmit.api',{phone:this.customer.phone,memo:this.customer.memo,posSaleIds:this.posSaleIds},data=>{
        console.log(data)
        if(data.code==1){
        this.navCtrl.push('CustomerReturnResultPage',{item:data.data},{ animation: 'md-transition' })
      }else{
        this.appService.alert(data.msg)
      }
      })
    }
  }
  // send(){
  //   if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.customer.phone)){
  //     this.appService.httpPost('get_phone_code.api',this.params.paramsPublic({code:4,phone:this.customer.phone}),data=>{
  //       if(data.code==1){
  //         this.sms=true;
  //         setInterval(()=>{
  //          if(this.num>0){
  //           --this.num;
  //          }
  //         },1000)
  //       }else{
  //         this.appService.toast(data.msg)
  //       }
  //     })
  //   }else{
  //     this.appService.toast('请输入合法手机号码！')
  //   }
  // }

}
