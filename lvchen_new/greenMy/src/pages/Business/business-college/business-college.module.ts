import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessCollegePage } from './business-college';

@NgModule({
  declarations: [
    BusinessCollegePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessCollegePage),
  ],
})
export class BusinessCollegePageModule {}
