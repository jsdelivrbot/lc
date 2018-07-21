import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ComplainDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-detail',
  templateUrl: 'complain-detail.html',
})
export class ComplainDetailPage {
  data = {};
  memo = '';
  identity = 0; //-1业务员，1员工，2、3导购
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public apps: AppService, 
     public appUrl:AppGlobal) {
  }

  ionViewDidLoad() {
    this.apps.getItem('userInfo',val=>{
        this.identity = val['tag'];
    })
    this.getData();
  }

  getData(){
  	this.apps.httpPost('listJsonComplaintDtl.api',{
      'id':this.navParams.get('id')
    },data => {
      if (data.code == -1) {
        this.apps.toast(data.msg);
      }else{
        this.data = data.map;
        this.memo = data.map.auditDetails;
      }
    },true);     
  }

  complaintRespone(action){
  	var op = 'complaintRespone.api';
  	var disMsg = '投诉回复成功！';
  	if (action == 1) {
  		op = 'unBind.api';
  		disMsg = '解除绑定成功';
  	}
  	this.apps.httpPost(op,{
      'complaintId':  this.data['complaintId'],
      'integralCode':this.data['respondentIntegralCode'],
      'memo': this.memo
    },data => {
      if (data.code == -1) {
        this.apps.toast(data.msg);
      }else{
        this.apps.disAlert(disMsg, callback =>{
           this.navCtrl.pop();
        });
      }
    },true); 
  }

}
