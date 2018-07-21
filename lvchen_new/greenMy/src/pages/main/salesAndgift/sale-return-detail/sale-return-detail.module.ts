import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleReturnDetailPage } from './sale-return-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    SaleReturnDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SaleReturnDetailPage),
  ],
})
export class SaleReturnDetailPageModule {}
