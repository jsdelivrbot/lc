import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Navbar } from 'ionic-angular/components/toolbar/navbar';
import { AppService, AppGlobal } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the CompanyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-company-info',
  templateUrl: 'company-info.html',
})
export class CompanyInfoPage implements OnInit {
  i: number = 0;
  @ViewChild('contentSlides') contentSlides: Slides;
  @ViewChild(Navbar) navbar: Navbar;
  public hasNext: boolean = false;
  public menus: Array<string>;
  public topics = [];
  public companyList = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apps: AppService,
    public appUrl:AppGlobal) {

  }
  ionViewDidLoad() {
    this.navbar.backButtonClick = this.backButtonClick;
  }

  backButtonClick = (e: UIEvent) => {
    // do something
    this.navCtrl.popToRoot({ animation: 'md-transition' });
  }
  CompanyData(typeId) {
    console.log(typeId)
    return {
      gotopic: (refresher, index) => {
        let hasNextPage = true;
        this.apps.httpPost('findInformationJson.api',{ 'classify': 'company', 'typeId': typeId, 'page': 1 }, data => {
          if (data.map.data == null) {
            hasNextPage = false;
          } else if (data.map.data.length < 10) {
            hasNextPage = false;
          } else {
            hasNextPage = true;
          }
          this.topics[index]['data'] = [
            {
              'hasNextPage': hasNextPage,
              'nextPage': 2,
              'data': data.map.data
            },

          ]
          this.CompanyData(typeId).getNext(index);

          console.log(this.topics);
          refresher.complete();
        })
      }
      ,
      getMore: (infiniteScroll, index) => {
        let hasNextPage = this.topics[index]['data'].hasNextPage;
        let nextPage = this.topics[index]['data'].nextPage;
        let moreGotopic = this.topics[index]['data'].data;
        this.CompanyData(typeId).getNext(index);
        this.apps.httpPost('findInformationJson.api',{ 'classify': 'company', typeId: typeId, page: nextPage }, data => {
          moreGotopic = moreGotopic.concat(data.map.infolist)
          if (data.map.data == null) {
            hasNextPage = false;
          } else if (data.map.data.length < 10) {
            hasNextPage = false;
          } else {
            hasNextPage = true;
            nextPage++
          }

          this.topics[index]['data'] = [{
            hasNextPage: hasNextPage,
            'nextPage': nextPage,
            'data': moreGotopic
          }]
          infiniteScroll.complete();
        })
      },
      getNext: (index: any) => {
        this.hasNext = this.topics[index]['data']['nexPage']
      }
    }
  }
  ngOnInit() {
    var k = false;
    var params = { 'classify': 'company' };
    this.apps.httpPost('findInformationTypeJson.api', params, data => {
      this.menus = data.map.data;
      console.log(this.menus)
      this.companyList = (100 / this.menus.length) + '%';
      var ary = [];
      for (let attr in this.menus) {
        ary[attr] = this.menus[attr]
      }
      this.topics = ary;
      console.log(ary)
      k = true;
      if (k) {
        this.doRefresh('', 0, ary[0]['id'])
      }

      console.log(this.topics)
    })

  }
  companyinfodetail(i) {
    this.navCtrl.push('CompanyInfoDetailPage', { id: i }, {
      animation: 'ios-transition'
    })
  }
  doRefresh(refresher, index, id) {
    console.log(refresher + '/' + index + '/' + id)

    if (!refresher) {
      let hasNextPage = true;
      this.apps.httpPost('findInformationJson.api',{ 'classify': 'company', typeId: id, page: 1 }, data => {
        console.log(data)
        if (data.map.data == null) {
          hasNextPage = false;
        } else if (data.map.data.length < 10) {
          hasNextPage = false;
        } else {
          hasNextPage = true;
        }
        this.topics[index]['data'] = [
          {
            hasNextPage: hasNextPage,
            'nextPage': 2,
            data: data.map.data
          },

        ]
      })
    } else {
      this.CompanyData(id).gotopic(refresher, index);
    }
  }
  doInfinite(infiniteScroll, index, id) {
    this.CompanyData(id).getMore(infiniteScroll, index);
  }
  selectPageMenu($event, index, id) {
    this.setStyle(index);
    this.contentSlides.slideTo(index);
  }
  slideChanged() {
    let index = this.contentSlides.getActiveIndex();
    console.log('sc ' + index)
    if (!this.topics[index]['data']) {
      this.doRefresh('', index, this.menus[index]['id'])
    }
    this.setStyle(index);
  }
  setStyle(index) {
    var Ind = parseInt(index)
    this.i = Ind - this.menus.length >= 0 ? this.menus.length - 1 : Ind;
  }
}
