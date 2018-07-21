import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { SalePage } from './sale';
@IonicPage()
@NgModule({
  declarations: [
    SalePage,
  ],
  imports: [
    IonicPageModule.forChild(SalePage),
  ]
 
})
export class SalePageModule {}
