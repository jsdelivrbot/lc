import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
  pk赛
 */

@IonicPage()
@Component({
  selector: 'page-pk-game',
  templateUrl: 'pk-game.html',
})
export class PkGamePage {
  @ViewChild(Navbar) navbar: Navbar;
  i: number = 0;
  public shopItem: any = [];
  public shop: any = [];
  public pkGameTwoPage = 'PkGameTwoPage';
  // 导购pk赛分页索引
  public sh = 1;
  // 控制导购列表上拉刷新
  public shopList = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appService: AppService) {
    this.getData();
  }
  /**
   * @author() linyunfu
   * @method() getData() 获取pk赛数据
   * @return {} void
   * */
  getData() {
    this.appService.httpPost(`pkGame.api`, {}, data => {
      if (data.code == 1) {
        console.log(data)
        this.shop = data['data'] || [];
        this.shopItem = this.shop.slice(0, 7);
        if (this.shopItem.length < 7) {
          this.shopList = false;
        }
      } else {
        this.appService.alert(`${data.msg}`)
        this.shopList = false;
      }
    }
    )
  }
  ionViewDidLoad() {

    this.navbar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.popToRoot({
        animation: 'md-transition'
      });
    }

  }
  /*
  *  @method（）getShopMoreData 导购pk赛分页fun
  * @param() infiniteScroll 上啦刷新固定传参
  * @return void
  */
  getShopMoreData(infiniteScroll): void {
    var data = this.shop.slice(this.sh * 7, this.sh * 7 + 7)
    this.shopItem = this.shopItem.concat(data)
    if (data.length % 7 != 0) {
      this.shopList = false;
    } else {
      this.sh++;
    }
    infiniteScroll.complete();
  }
  /**
   * @method() pkGameTwo(item.id,item.gameStatus)  用于pk赛跳转判断
   * @return {} void 
   * */ 
  pkGameTwo(gameId,status){
    // this.navCtrl.push('PkGameStaffTwoPage')
    if(JSON.parse(<any>window.localStorage.getItem('userInfo'))['tag']==1){
      this.navCtrl.push('PkGameStaffTwoPage',{id:gameId},{
        animation: 'md-transition'
      });
      return;
    }
    this.navCtrl.push('PkGameShopTwoPage')
    
  }
}
