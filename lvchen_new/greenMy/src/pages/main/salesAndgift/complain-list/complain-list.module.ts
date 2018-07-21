import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplainListPage } from './complain-list';

@NgModule({
  declarations: [
    ComplainListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplainListPage),
  ],
})
export class ComplainListPageModule {}
