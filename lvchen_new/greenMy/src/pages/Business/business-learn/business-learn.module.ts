import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessLearnPage } from './business-learn';

@NgModule({
  declarations: [
    BusinessLearnPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessLearnPage),
  ],
})
export class BusinessLearnPageModule {}
