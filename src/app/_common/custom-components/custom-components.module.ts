import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

// components and directives
import { WorldMapComponent } from './world-map/world-map.component';
import { TreeNode } from './tree/tree-node.component';
import { TreeInputComponent } from './tree/tree-input.component';
import { DispatcherModule } from '../dispatcher/dispatcher.module';
import { Wizard } from './wizard/wizard.component';
import { SimpleWizardSlide } from './wizard/simple-wizard-slide.component';
import { LoadingIndicatorModule } from '../locading-indicator/loading-indicator.module';
import { WizardSlide } from './wizard/wizard-slide';
import { HighlightAreaComponent } from './highlight-area/highlight-area.component';
import { InfieldLabelDirective } from './infield-label/infield-label.directive';
import { TypeaheadComponent } from './typeahead/typeahead.component';

@NgModule({
  imports: [TranslateModule, CommonModule, DispatcherModule.forRoot(), LoadingIndicatorModule, FormsModule, BsDropdownModule],
  declarations: [
    WorldMapComponent, TreeNode, TreeInputComponent, Wizard, WizardSlide, SimpleWizardSlide,
    HighlightAreaComponent, InfieldLabelDirective, TypeaheadComponent
  ],
  exports: [
    WorldMapComponent, TreeNode, TreeInputComponent, Wizard, WizardSlide, SimpleWizardSlide,
    HighlightAreaComponent, InfieldLabelDirective, TypeaheadComponent
  ]
})
export class CustomComponentsModule {
}
