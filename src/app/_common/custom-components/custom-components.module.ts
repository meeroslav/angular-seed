import {NgModule} from '@angular/core';

// components and directives
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';
import {WorldMapComponent} from './world-map/world-map.component';
import {TreeNode} from './tree/tree-node.component';
import {TreeComponent} from './tree/tree.component';
import {DispatcherModule} from '../dispatcher/dispatcher.module';

@NgModule({
  imports: [TranslateModule, CommonModule, DispatcherModule.forRoot()],
  declarations: [WorldMapComponent, TreeNode, TreeComponent],
  exports: [WorldMapComponent, TreeNode, TreeComponent]
})
export class CustomComponentsModule {
}
