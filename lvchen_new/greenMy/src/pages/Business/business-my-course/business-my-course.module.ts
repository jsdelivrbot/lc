import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessMyCoursePage } from './business-my-course';

@NgModule({
  declarations: [
    BusinessMyCoursePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessMyCoursePage),
  ],
})
export class BusinessMyCoursePageModule {}
