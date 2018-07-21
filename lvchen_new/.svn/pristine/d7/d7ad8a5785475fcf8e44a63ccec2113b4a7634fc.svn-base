import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the TargetGameTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-target-game-two',
  templateUrl: 'target-game-two.html',
})
export class TargetGameTwoPage {
  @ViewChild(Content)content:Content;
  storeSelected: string = '';
  storeMap: Array<any> = [];
  data=[];
  public more=true;
  public st=1;
  public targetThreePage='TargetGameThreePage';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = [
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },

      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
      {
        workName: '东莞一区',
        storeNumber: 10,
        targeSale: 2022222,
        sale: 11111,
        finishPre: '45%',
        id: 1111
      },
    ]
    this.storeMap=this.data.slice(0,20)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TargetGameTwoPage');
  }
  getMoreData($event){
    var data=this.data.slice(this.st*20,this.st*20+20)
    this.storeMap=this.storeMap.concat(data)
    console.log(data)
    if(data.length%20!=0){
      this.more=false;
    }else{
      this.st++;
    }
    $event.complete();
  }
  changeStore(){
    this.storeMap=[];
    this.content.resize();
    this.content.scrollToTop(0);
  }
}
