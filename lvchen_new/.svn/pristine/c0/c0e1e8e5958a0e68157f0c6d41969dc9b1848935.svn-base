import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the ModifyPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-password',
  templateUrl: 'modify-password.html',
})
export class ModifyPasswordPage {
  params:any;
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams, 
     public apps: AppService) {
  console.log(navParams)
   
  }
  submit(value): any{
    
    let pm=value.passwordGroup
    pm.userId = this.navParams.data.id;
    let pmp=pm.password;
    let pmn=pm.newPassword;

    var _father=this;
   if(!pmp|| !pmn){
    this.apps.alert('密码不能为空')
    return;
   }else if(pmp.length<6||pmn.length<6){
    this.apps.alert('密码输入不正确,不能少于6位！')
    return;
   }else{
    this.apps.httpPost('update_password.api',pm,data => {
      console.log(data);
      if (data.code == -1) {
         _father.apps.toast(data.msg);
      }else{
        _father.apps.toast(data.msg);
        this.navCtrl.pop()
      }
    },true);           

  }

  }

}
