import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessCourseSerachPage } from './business-course-serach';

@NgModule({
  declarations: [
    BusinessCourseSerachPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessCourseSerachPage),
  ],
})
export class BusinessCourseSerachPageModule {}
