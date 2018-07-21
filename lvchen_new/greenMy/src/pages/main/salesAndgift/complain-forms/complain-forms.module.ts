import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainFormsPage } from './complain-forms';

@NgModule({
  declarations: [
    ComplainFormsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainFormsPage),
  ],
})
export class ComplainFormsPageModule {}
