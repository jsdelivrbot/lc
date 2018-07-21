import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppService } from '../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the PresentStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-present-statistics',
  templateUrl: 'present-statistics.html',
})
export class PresentStatisticsPage {
  public mItems :{itemName:string,type:number,checked:boolean}[];
  public timeSelect: boolean = false;
  public startDate: any;
  public endDate: any;
  public sections: string[]; 
  public defaultSection: string;
  public type: number;
  public timeSwitch: boolean = true; 
  // 选择时间
  public dateTag = 1;

  //sum:赠品总数
  public sum:number;
 
  //商品数据
  public giftData = [];
   // 本身的storeId
  public storeId:any;
  // select store
  public storeMap;
  public storeMapLength: boolean;
  public identity: number;
  public presentGiftDetail='PresentGiftDetailPage';
  
  public pushPage;
  public groupId;
  public storeName: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appService: AppService,
    public loadingCtrl: LoadingController) {
      //this.pushPage = this.presentGiftDetail;


      this.mItems = [
        { itemName: '当天', type: 1, checked: true },
        { itemName: '昨天', type: 2, checked: false },
        { itemName: '当月', type: 3, checked: false },
        { itemName: '上月', type: 4, checked: false },
        { itemName: '自定义', type: 10, checked: false }
      ];

      //获取登录人员身份
      this.appService.getItem('userInfo', val => {
        this.identity = val['tag'];
      })

      this.appService.getItem('curStore',val=>{
        this.storeId=val['id'];
        this.storeName=val['storeName'];
        // console.log(this.storeId)
      })
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.findGift();
    this.OrgUser();
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      duration: 1000
    });
    loader.present();
  }

  checkIdentity(){
    if(this.identity === 2 || this.identity === 3){
      this.pushPage = '';
    }else{
      // this.presentLoading();
      this.pushPage = this.presentGiftDetail;
    }
  }

  //进入页面加载数据
  findGift(){
    this.appService.httpPost('findGift.api', 
    { 
      storeId: this.storeId,
    }, data => {
      this.giftData = data['data'];
      this.sum = data['saleQty'];
      console.log(data);

      if (data.code !== 1) {
        this.appService.alert(`${data.msg}`)
      }

    })
  }

  //选择时间查看数据
  timeZoneSelect() {
    this.presentLoading();
    if(this.dateTag!==10){
      this.appService.httpPost('findGift.api', {storeId: this.storeId, dateTag: this.dateTag}, data => {
        console.log(data)
        //console.log(selectedTime);
        this.giftData = data['data'];
        this.sum = data['saleQty'];
        
       })
    }
    if(this.dateTag===10){
      this.appService.httpPost('findGift.api', {storeId: this.storeId, sDate: this.startDate, eDate: this.endDate}, data => {
        // console.log(data);
        
        this.giftData = data['data'];
        this.sum = data['saleQty'];
       })
    }  
    this.timeSelect = !this.timeSelect;
  }

  //点击弹出或关闭时间选择
  showTimeContent(){
    this.timeSelect = !this.timeSelect;
  }



  //选择日期
  Select(itemType) {
    //console.log(itemType);
    this.dateTag = itemType;
    for(let i = 0;i< this.mItems.length; i++){
      this.mItems[i].checked = false;
      if(this.mItems[i].type===itemType){
        this.mItems[i].checked = true;
        if(itemType===10){
          this.timeSwitch = false;
          //console.log(this.timeSwitch)
        }else{
          this.timeSwitch = true;
        }
      } 
    }
  }

   // 判断是否为总部
   OrgUser() {
    this.appService.httpPost('getNextOrg.api', { storeId: this.storeId }, data => {
      this.storeMap = data['data'] || [];
      console.log(this.storeMap,'nextGroup');
      // if(this.storeMap.length>0){}
      this.storeMap.unshift({orgId:this.storeId,orgName: this.storeName});
      
      
      this.storeMapLength = this.storeMap.length > 0 ? true : false;
    })
  }

  //总部人员选择下级业务组
  selectGroup() {
    this.presentLoading();
    this.appService.httpPost('findGift.api', 
    { 
      storeId: this.storeId,
    }, data => {
      this.giftData = data['data'];
      this.sum = data['saleQty'];
      console.log(data);

      if (data.code !== 1) {
        this.appService.alert(`${data.msg}`)
      }

    })
  }

  timeOption($event){
    console.log($event);
    if($event.target.className=='timeContent'){
      this.timeSelect=false;
    }else{
      this.timeSelect=true;
    }
  }
}

