import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the TargetGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-target-game',
  templateUrl: 'target-game.html',
})
export class TargetGamePage {
  @ViewChild(Slides)slides:Slides;
  i:number=0;
  public shopItem:any=[];
  public storeItem:any=[];
  public shop:any=[];
  public store:any=[];
  public targetTwoPage='TargetGameTwoPage';
  // 导购pk赛分页索引
  public sh=1;
  // 门店pk赛缩影
  public st=1;
  // 控制导购列表上拉刷新
  public shopList=true;
  // 控制门店列表上拉刷新
  public storelist=true;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,) {
     
      this.shop=[
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312323
          ,"targetSale":12312312

        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
      ];
      this.store=[
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "will",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "has",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
        {
          "gameStatus": "finish",
          "startTime": "123123123123",
          "endTime": "1321312312313",
          "id": "1111",
          "gamename": "六月pk赛",
          "finishSale":31312
          ,"targetSale":12312312
        },
      ];
      this.shopItem=this.shop.slice(0,5);
      this.storeItem=this.store.slice(0,5);
  }

  ionViewDidLoad() {
  

  }
  slideDidChange(){
    if(this.slides.getActiveIndex()==2){
      this.i=1;
      return;
    }
    this.i=this.slides.getActiveIndex()
  }
  sliderIndex(num){
    console.log(num)
    this.slides.slideTo(num);
    this.i=num;
  }
  /*
  *  @method（）getShopMoreData 导购pk赛分页fun
  * @param() infiniteScroll 上啦刷新固定传参
  * @return void
  */ 
  getShopMoreData(infiniteScroll):void{
    console.log(111)
    var data=this.shop.slice(this.sh*5,this.sh*5+5)
    this.shopItem=this.shopItem.concat(data)
    if(data.length%5!=0){
      this.shopList=false;
    }else{
      this.sh++;
    }
    infiniteScroll.complete();
  }
  getStoreMoreData(infiniteScroll):void{
    var data=this.store.slice(this.st*5,this.st*5+5)
    this.storeItem=this.shopItem.concat(data)
    if(data.length%5!=0){
      this.storelist=false;
    }else{
      this.st++;
    }
    infiniteScroll.complete();
  }
}
