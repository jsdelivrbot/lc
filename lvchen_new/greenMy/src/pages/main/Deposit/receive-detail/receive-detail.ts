import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ReceiveDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive-detail',
  templateUrl: 'receive-detail.html',
})
export class ReceiveDetailPage {

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:AppService) {
  }

  ngOnInit(){
    this.app.httpPost('getDepositDtlOrderGoods.api',this.navParams.data,data=>{
      if (data.code == -1) {
          this.app.toast(data.msg);
        }else{
          this.data = data.data;
          // alert(JSON.stringify(this.data))
        }
        console.log(data);
    },true);
  }
 
}
