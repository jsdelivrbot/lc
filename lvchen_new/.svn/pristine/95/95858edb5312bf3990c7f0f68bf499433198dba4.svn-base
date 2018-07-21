import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { AppService } from '../../../../providers/service-public-service/service-public-service';

/**
 * Generated class for the SalesReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-return',
  templateUrl: 'sales-return.html',
})

export class SalesReturnPage {
  @ViewChild(Navbar)navbar:Navbar;
  public companyData={};
  public apiUrl='findSellCasPosSale.api';
  public typeId:number=0;
  public userId:string;
  public storeId:string;
  public i=0;
  public hasmore=false;
  public saleReturnData:any;
  public menus:Array<any>;
  
  constructor(
              public appservice:AppService,
              public navparams:NavParams,
              public navCtrl:NavController

  ) {
    
    console.log('Hello ServiceCompanyListProvider Provider');
  }
  ngOnInit(){
    this.navbar.backButtonClick = (e:UIEvent)=>{
      
      this.navCtrl.pop({ animation: 'md-transition' });
    
  }
  }
  ionViewDidLoad() {
   
    this.menus=[{name:'未审核'}, {name:'通过'}, {name:'未通过'}]
    this.selectPageMenu('',0);
  }
  SaleReturnDetail(saleId,state){
    
    this.navCtrl.push('SaleReturnDetailPage',{saleId:saleId,state:state},{
      animation: 'md-transition'
    })
  }
  
  
  // dorefresh function
  getTopTopics($event){
   
    try{
      if(this.companyData[this.typeId]['data']!=null){
        this.saleReturnData=this.companyData[this.typeId]['data'];
        this.hasmore=this.companyData[this.typeId]['hasNextPage'];
        return ;
      }
      
    }catch(e){
      var hasNextPage=true;
      this.appservice.httpPost(this.apiUrl,
          {state:this.typeId,page:1},
          data=>{
            if(data.data.length>=10){
              hasNextPage=true;
            }else{
              hasNextPage=false;
            }
              this.companyData[this.typeId]={
                hasNextPage:hasNextPage,
                nextPage:2,
                data:data.data
              }
  
              this.saleReturnData=this.getData();
              this.hasmore=this.hasNextPage();
          }
        )
    }
 
  }
  getMoreData($event){
    var hasNextPage=this.companyData[this.typeId].hasNextPage;
    var nextPage=this.companyData[this.typeId].nextPage;
    var moreTopicsData=this.companyData[this.typeId].data;
    this.appservice.httpPost(this.apiUrl,
        {state:this.typeId,page:nextPage},
        data=>{
          if(data.data.length>=10){
            hasNextPage=true;
            nextPage++;
          }else{
            hasNextPage=false;
          }
          moreTopicsData=moreTopicsData.concat(data.data);
            this.companyData[this.typeId]={
              hasNextPage:hasNextPage,
              nextPage:nextPage,
              data:moreTopicsData
            }
            this.saleReturnData=this.getData();
            this.hasmore=this.hasNextPage();
           $event.complete();
        }
      )
  }
  selectPageMenu($event,type){   //点击分类加载数据
    this.i=type;
    this.typeId=type;

      this.getTopTopics($event);
    
  
  }
  
   hasNextPage(){
    if (  this.companyData[this.typeId] === undefined) {
        return false;
    }
    return this.companyData[this.typeId].hasNextPage
  }
  getData(){
   
    if ( this.companyData[this.typeId] === undefined) {
      return false;
  }
  return this.companyData[this.typeId].data
}
  
}

