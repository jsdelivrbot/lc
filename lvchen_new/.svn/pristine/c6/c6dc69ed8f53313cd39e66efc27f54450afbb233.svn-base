import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AppService } from '../../../../providers/service-public-service/service-public-service';
/**
 * Generated class for the ComplainFormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complain-forms',
  templateUrl: 'complain-forms.html',
})
export class ComplainFormsPage {
  
  memo = "";
  data;
  imageData =""
  base64Image = "./assets/imgs/upload_pic.png";
  loading = this.loadingCtrl.create({ spinner: 'bubbles' });

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private camera: Camera,
  	public apps: AppService,
  	public loadingCtrl : LoadingController) {
  	this.data = this.navParams.get('data');
  }

  onCamera(){

  	const options: CameraOptions = {
	  quality: 30,
	  destinationType: this.camera.DestinationType.DATA_URL,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE,
	  correctOrientation: true
    }

    this.loading.present();
    
  	this.camera.getPicture(options).then((imgData) => {
  	   this.imageData = imgData;
  	   this.base64Image = "data:image/jpeg;base64," + imgData;
  	   this.loading.dismiss();
    }, (err) => {
    });
  }

  onSubmit(){
    if (this.imageData == "") {
  		this.apps.alert('请上传图片！');
  		return;
  	}
  	this.apps.httpPost('insertComplaint.api',{
      'respondentIntegralCode':this.data.integralCode,
      'complaintDetails': this.memo,
      'base64Img': this.imageData
    },data => {
      if (data.code == -1) {
        this.apps.toast(data.msg);
      }else{
        this.apps.disAlert('提交投诉成功！', callback =>{
           this.navCtrl.pop();
        });
      }
    },true);     
  }

}
