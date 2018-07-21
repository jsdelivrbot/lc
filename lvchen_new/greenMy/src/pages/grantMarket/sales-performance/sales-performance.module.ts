import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPerformancePage } from './sales-performance';

@NgModule({
  declarations: [
    SalesPerformancePage,
  ],
  imports: [
    IonicPageModule.forChild(SalesPerformancePage),
  ],
})
export class SalesPerformancePageModule {}
