import { Component } from '@angular/core';
import { NavController, AlertController, App, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { IonicPage } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public userName: string;
  public phone: string;
  public id: string;

  storeName = '';

  storeMap = [];

  constructor(
    public navCtrl: NavController,
    public appService: AppService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public appCtrl:App,
    public platform:Platform) {

    this.appService.getItem('userInfo',(val) => {
      console.log(val);
      this.userName = val.userName;
      this.phone = val.phone;
      this.id = val.id;
      this.storeMap = val.storeMap;
    });

    this.appService.getItem('curStore',(val) => {
      this.storeName = val.storeName;
    });

  }
  modifyPsw(): any {
    console.log(this.id);
    this.navCtrl.push('ModifyPasswordPage', { id: this.id })
  }

  logout() {
    window.localStorage.removeItem('userInfo');
    this.appCtrl.getRootNav().push('LoginPage');
  }


  close() {
    let prompt = this.alertCtrl.create({
      title: '解除绑定',
      message: "是否确定解除绑定?",

      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            this.appService.httpPost('untilDriverToken.api',{}, data => {
              console.log(data);
              if (data.code == -1) {
               this.appService.toast(data.msg);

              } else {
                window.localStorage.clear();
                this.appService.toast(data.msg);
                this.appCtrl.getRootNavs()[0].setRoot('LoginPage');
              }
            }, true);

          }
        }
      ]
    });
    prompt.present();
  }

  showRadio() {

    let alert = this.alertCtrl.create();

    alert.setTitle('选择');

    for (var i = 0; i < this.storeMap.length; ++i) {
      alert.addInput({
        type: 'radio',
        label: this.storeMap[i].storeName,
        value: i + '',
        checked: false
      });
    }

    alert.addButton({
      text: '确定',
      handler: data => {
        if (!data) {
          return false;
        }
        var pos = parseInt(data);
        this.storeName = this.storeMap[pos].storeName;
        this.appService.setItem('curStore',this.storeMap[pos])
      }
    });
    alert.present();
  }
}