import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScangiftPage } from './scangift';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@NgModule({
  declarations: [
    ScangiftPage,
  ],
  imports: [
    IonicPageModule.forChild(ScangiftPage),
  ],
})
export class ScangiftPageModule {}
