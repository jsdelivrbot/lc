import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameRulePage } from './game-rule';

@NgModule({
  declarations: [
    GameRulePage,
  ],
  imports: [
    IonicPageModule.forChild(GameRulePage),
  ],
})
export class GameRulePageModule {}
