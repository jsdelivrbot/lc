import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectGiftPage } from './select-gift';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    SelectGiftPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SelectGiftPage),
  ],
})
export class SelectComplimentaryPageModule {}
