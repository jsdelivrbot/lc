import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Navbar } from 'ionic-angular/components/toolbar/navbar';
import { AppGlobal, AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the ComplainListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-list',
  templateUrl: 'complain-list.html',
})
export class ComplainListPage {
  state: number = 0;
  @ViewChild('contentSlides') contentSlides: Slides;
  @ViewChild(Navbar) navbar: Navbar;
  public menus = [{'name':'待审核','id':1},{'name':'解除绑定','id':0},{'name':'投诉回复','id':2}];
  public topics = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appUrl:AppGlobal,
    public apps: AppService) {

  }
  ionViewDidLoad() {
    this.navbar.backButtonClick = this.backButtonClick;
  }

  backButtonClick = (e: UIEvent) => {
    this.navCtrl.popToRoot({ animation: 'md-transition' });
  }
  
  ionViewWillEnter() {
    this.topics = [[],[],[]];
  	this.getData(this.state);
  }

  gotoDetail(i) {

    this.navCtrl.push('ComplainDetailPage', { id: i })
  }
  getData(index) {
    this.apps.httpPost('listJsonComplaint.api',{'complaintState': this.menus[index].id}, data => {
        this.topics[index]= data.map.data;
    },true);
  }
  selectPageMenu($event, index) {
    this.setStyle(index);
    this.contentSlides.slideTo(index);
  }
  slideChanged() {
    let index = this.contentSlides.getActiveIndex();
    if (this.topics[index].length == 0) {
      this.getData(index)
    }
    this.setStyle(index);
  }
  setStyle(index) {
    this.state = index - this.menus.length >= 0 ? this.menus.length - 1 : index;
  }
}
