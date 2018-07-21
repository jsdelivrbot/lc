import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveCheckPage } from './receive-check';

@NgModule({
  declarations: [
    ReceiveCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveCheckPage),
  ],
})
export class ReceiveCheckPageModule {}
