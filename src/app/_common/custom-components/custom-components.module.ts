import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate';
import {CommonModule} from '@angular/common';

// components and directives
import {WorldMapComponent} from './world-map/world-map.component';
import {TreeNode} from './tree/tree-node.component';
import {TreeComponent} from './tree/tree.component';
import {DispatcherModule} from '../dispatcher/dispatcher.module';
import { Wizard } from './wizard/wizard.component';
import { SimpleWizardSlide } from './wizard/simple-wizard-slide.component';
import { LoadingIndicatorModule } from '../locading-indicator/loading-indicator.module';
import { WizardSlide } from './wizard/wizard-slide';
import { HighlightAreaComponent } from './highlight-area/highlight-area.component';
import { InfieldLabelDirective } from './infield-label/infield-label.directive';

@NgModule({
  imports: [TranslateModule, CommonModule, DispatcherModule.forRoot(), LoadingIndicatorModule],
  declarations: [WorldMapComponent, TreeNode, TreeComponent, Wizard, WizardSlide, SimpleWizardSlide, HighlightAreaComponent, InfieldLabelDirective],
  exports: [WorldMapComponent, TreeNode, TreeComponent, Wizard, WizardSlide, SimpleWizardSlide, HighlightAreaComponent, InfieldLabelDirective]
})
export class CustomComponentsModule {
}
