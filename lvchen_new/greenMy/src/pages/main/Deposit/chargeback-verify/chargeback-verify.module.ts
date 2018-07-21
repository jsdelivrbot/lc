import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargebackVerifyPage } from './chargeback-verify';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    ChargebackVerifyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChargebackVerifyPage),
  ],
})
export class ChargebackVerifyPageModule {}
