import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCustomerInfoPage } from './my-customer-info';

@NgModule({
  declarations: [
    MyCustomerInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCustomerInfoPage),
  ],
})
export class MyCustomerInfoPageModule {}
