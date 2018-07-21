import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerReturnPage } from './customer-return';

@NgModule({
  declarations: [
    CustomerReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerReturnPage),
  ],
})
export class CustomerReturnPageModule {}
