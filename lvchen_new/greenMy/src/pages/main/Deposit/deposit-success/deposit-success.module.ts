import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositSuccessPage } from './deposit-success';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    DepositSuccessPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DepositSuccessPage),
  ],
})
export class DepositSuccessPageModule {}
