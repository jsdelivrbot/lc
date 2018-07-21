import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerLoggingPage } from './customer-logging';

@NgModule({
  declarations: [
    CustomerLoggingPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerLoggingPage),
  ],
})
export class CustomerLoggingPageModule {}
