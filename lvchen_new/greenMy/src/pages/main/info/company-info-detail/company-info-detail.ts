import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Content} from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';


/**
 * Generated class for the CompanyInfoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-info-detail',
  templateUrl: 'company-info-detail.html',
})
export class CompanyInfoDetailPage {
  public CompanyInfoDetailData:any='';
  public CreateDate:any='';
  @ViewChild(Content)content:Content;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appservice: AppService
  ) {
  this.companyInfoDetail(this.navParams.get('id'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInfoDetailPage');

  }
  companyInfoDetail(id){
    console.log(id)
    this.appservice.httpPost('getInformation.api',{'intormationId':id},data=>{
      this.CompanyInfoDetailData=data.map.data;
      this.CreateDate=data.map.data.startTime.time;
      console.log(data.map.data)
    })
  }
  gobefore(){
    this.content.scrollToTop(0)
  }
}
