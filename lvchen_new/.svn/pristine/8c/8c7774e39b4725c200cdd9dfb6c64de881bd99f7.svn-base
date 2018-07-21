import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PkGameTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pk-game-two',
  templateUrl: 'pk-game-two.html',
})
export class PkGameTwoPage {
  public pkTwoPageData=[];
  public pktwoPageList=true;
  public data:Array<any>=[];
  public sh=1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=[
      {
      name:'导购',
      sale:123123,
      distance:123213,
      id:111,
      sort:1
      },
      {
        name:'导购',
        sale:123123,
        distance:123213,
        id:111,
        sort:2
      },
      {
        name:'导购',
        sale:123123,
        distance:123213,
        id:111,
        sort:1
        },
        {
          name:'导购',
          sale:123123,
          distance:123213,
          id:111,
          sort:3
        },
        {
          name:'导购',
          sale:123123,
          distance:123213,
          id:111,
          sort:4
          },
          {
            name:'导购',
            sale:123123,
            distance:123213,
            id:111,
            sort:5
          },{
            name:'导购',
            sale:123123,
            distance:123213,
            id:111,
            sort:6
            },
            {
              name:'导购',
              sale:123123,
              distance:123213,
              id:111,
              sort:7
            },{
              name:'导购',
              sale:123123,
              distance:123213,
              id:111,
              sort:8
              },
              {
                name:'导购',
                sale:123123,
                distance:123213,
                id:111,
                sort:9
              },{
                name:'导购',
                sale:123123,
                distance:123213,
                id:111,
                sort:10
                },
                {
                  name:'导购',
                  sale:123123,
                  distance:123213,
                  id:111,
                  sort:11
                },{
                  name:'导购',
                  sale:123123,
                  distance:123213,
                  id:111,
                  sort:12
                  },
                  {
                    name:'导购',
                    sale:123123,
                    distance:123213,
                    id:111,
                    sort:13
                  },{
                    name:'导购',
                    sale:123123,
                    distance:123213,
                    id:111,
                    sort:14
                    },
                    {
                      name:'导购',
                      sale:123123,
                      distance:123213,
                      id:111,
                      sort:15
                    }
    ]
    this.pkTwoPageData=this.data.slice(0,20);
    if(this.data.length<20){
      this.pktwoPageList=false;
    }
    console.log(this.pkTwoPageData)
  }

  ionViewDidLoad() {
  }
  getShopMoreData(infiniteScroll):void{
    var data=this.data.slice(this.sh*20,this.sh*20+20)
    this.pkTwoPageData=this.pkTwoPageData.concat(data)
    if(data.length%20!=0){
      this.pktwoPageList=false;
    }else{
      this.sh++;
    }
    infiniteScroll.complete();
  }

}
