import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
// components and directives
import { WorldMapComponent } from './world-map';
import { TreeInputComponent, TreeNode } from './tree';
import { DispatcherModule } from '../dispatcher';
import { SimpleWizardSlide, Wizard, WizardSlide } from './wizard';
import { HighlightAreaComponent } from './highlight-area';
import { InfieldLabelDirective } from './infield-label';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [TranslateModule, CommonModule, DispatcherModule.forRoot(), SharedModule, FormsModule, BsDropdownModule],
  declarations: [
    WorldMapComponent, TreeNode, TreeInputComponent, Wizard, WizardSlide, SimpleWizardSlide,
    HighlightAreaComponent, InfieldLabelDirective
  ],
  exports: [
    WorldMapComponent, TreeNode, TreeInputComponent, Wizard, WizardSlide, SimpleWizardSlide,
    HighlightAreaComponent, InfieldLabelDirective
  ]
})
export class CustomComponentsModule {
}
