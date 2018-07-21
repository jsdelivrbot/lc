import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerReturnScannerPage } from './customer-return-scanner';

@NgModule({
  declarations: [
    CustomerReturnScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerReturnScannerPage),
  ],
})
export class CustomerReturnScannerPageModule {}
