import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerLoggingTabsPage } from './customer-logging-tabs';

@NgModule({
  declarations: [
    CustomerLoggingTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerLoggingTabsPage),
  ],
})
export class CustomerLoggingTabsPageModule {}
