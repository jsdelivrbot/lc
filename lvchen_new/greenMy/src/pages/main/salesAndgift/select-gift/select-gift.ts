import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular/components/toolbar/navbar';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the SelectGiftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-gift',
  templateUrl: 'select-gift.html',
})
export class SelectGiftPage {
  @ViewChild(Navbar)navbar:Navbar;
  data;

  keyword;

  num = 0;

  public checkedData=[];
  public presentMap=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService : AppService,
    public alertCtrl:AlertController) {
   
  }
  ionViewWillEnter(){
    this.appService.getItem('pre',val=>{
      this.presentMap=val['presentMap']||[];
      this.num=this.presentMap.length||0;
    })
  }



  onKeyboard($event){
    if($event.key=='Enter'){  
      this.onSearch();
    } 
  }

  onSearch(){
    if(this.keyword.length < 2){
        this.appService.toast('查询必须2个字符以上');
      }else{
        this.appService.httpPost('findGiftGoods.api',
          {code:this.keyword},data => {
          if (data.code == -1) {
            this.appService.toast(data.msg);
          }else{
            this.data = data.data;
            for (var i = 0; i < this.data.length; ++i) {
              this.data[i].checked = false;
              for (var j = 0; j < this.presentMap.length; ++j) {
                if (this.presentMap[j].id == this.data[i].goodsId) {
                   this.data[i].checked = true;
                   console.log(this.data[i].checked);
                   break;
                }
              }
            }
          }
         
        },true);
      }
  }

  onChecked(index){
    
    for (var i = 0; i < this.presentMap.length; ++i) {
      if (this.presentMap[i].no == index) {
        this.presentMap.splice(i,1);
        this.num = this.presentMap.length;
        return;
      }
    }
    console.log(index);

    var item = this.data[index];

    let alert = this.alertCtrl.create({enableBackdropDismiss:false});
    
    alert.setTitle('选择礼品来源');

    alert.addInput({
        type: 'radio',
        label: "借门店",
        value: '0',
        checked: false
    });
    
    alert.addInput({
        type: 'radio',
        label: "欠顾客",
        value: '1',
        checked: false
    });

    alert.addInput({
        type: 'radio',
        label: "其它",
        value: '2',
        checked: true
    });

    alert.addButton({
      text: '确定',
      handler: data => {
        this.presentMap.push({no:index,id:item.goodsId,name:item.goodsName,num:'1',source:data});
        this.num = this.presentMap.length;
      }
    });
    alert.present();
  }

  onCancel() {   
    this.navCtrl.pop();
  }
  //提交
  
  submit() {
    let params={
      presentMap:this.presentMap
    }
    this.appService.setItem('pre',params)
    this.navCtrl.pop();
  }
}
