import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  @ViewChild(Content) content: Content;

  public order='';
  public orderData=[];
  public hasAdd=false;
  // 用于储备phone
  public phone={
    p:this.order
  }
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public appservice:AppService) {
      // this.phone = this.navParams.get('phone');
      // alert(this.phone);
      
  }


  add(){
    let ary=[];
    for(let i=0;i<this.orderData.length;i++){
      if(this.orderData[i]['checked']==true){
          ary.push(this.orderData[i].id)
      }
    }
    if(ary.length<1){
      this.appservice.alert('请选择追加的单号')
    }else{
      this.appservice.httpPost('chengeCasPosSaleOrder.api',{ids:JSON.stringify(ary)},data=>{
        if(data.code==1){
          this.appservice.setItem('order',data);
          this.navCtrl.push('OrderModifyPageOnePage',{phone:this.phone['p']})
        }else{
          this.appservice.alert(data.msg);
        }
      },true)
    }
  }
  onKeyboard($event){
    if($event.key=='Enter'){
      this.onSearch();
    }
  }

  onSearch(){
    this.phone.p=this.order
    if (this.order.length != 11) {
      this.appservice.toast("请输入正确的手机号码");
      return; 
    }
    this.appservice.httpPost('findOrderCasPosSale.api',{phone: this.order},data=>{
        this.orderData=data.data;
        if(data.data.length>=1){
          this.hasAdd=true;
          for(let i=0;i<data.data.length;i++){
              data.data[i]['checked']=false;
          }
          this.content.resize()
        }else{
          this.hasAdd=false;           
        }
        this.appservice.toast(data.msg)
    })
  }
  changeCarts(){
    console.log(this.orderData)
  }
  OrderDetail(id){
    this.navCtrl.push('OrderDetailPage',{id:id})
  }
  
}
  


