import { NgModule } from '@angular/core';

// components and directives
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { WorldMapComponent } from './world-map/world-map.component';

@NgModule({
  imports: [TranslateModule, CommonModule],
  declarations: [WorldMapComponent],
  exports: [WorldMapComponent]
})
export class CustomComponentsModule {
}