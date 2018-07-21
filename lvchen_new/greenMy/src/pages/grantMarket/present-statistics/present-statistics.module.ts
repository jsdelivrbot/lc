import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentStatisticsPage } from './present-statistics';

@NgModule({
  declarations: [
    PresentStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentStatisticsPage),
  ],
})
export class PresentStatisticsPageModule {}
