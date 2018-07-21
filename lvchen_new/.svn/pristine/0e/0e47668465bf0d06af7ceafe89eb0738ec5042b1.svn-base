import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the PkGameStaffTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface gameId{
  gameId:any
} 
@IonicPage()
@Component({
  selector: 'page-pk-game-staff-two',
  templateUrl: 'pk-game-staff-two.html',
})
export class PkGameStaffTwoPage {
  private storeData=[] as Array<string>;
  private finishData=[] as Array<string>;
  private noFinishData=[] as Array<string>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appService:AppService) {
    this.staffPageData({gameId:navParams.get('id')})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PkGameStaffTwoPage');
  }
  staffPageData(gameId:gameId){
      this.appService.httpPost('pkGameTwoPage.api',gameId,data=>{
        console.log(data)
      })
  }
}
