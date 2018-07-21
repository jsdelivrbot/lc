import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveVerifyPage } from './receive-verify';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    ReceiveVerifyPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ReceiveVerifyPage),
  ],
})
export class ReceiveVerifyPageModule {}
