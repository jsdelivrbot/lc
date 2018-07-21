import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveSuccessPage } from './receive-success';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    ReceiveSuccessPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ReceiveSuccessPage),
  ],
})
export class ReceiveSuccessPageModule {}
