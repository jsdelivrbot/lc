import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositDetailPage } from './deposit-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    DepositDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DepositDetailPage),
  ],
})
export class DepositDetailPageModule {}
