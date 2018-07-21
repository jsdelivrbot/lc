import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessExamPage } from './business-exam';

@NgModule({
  declarations: [
    BusinessExamPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessExamPage),
  ],
})
export class BusinessExamPageModule {}
