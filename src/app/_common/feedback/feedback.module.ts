import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
import { ToasterComponent } from './toaster.component';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ToasterComponent],
  exports: [ToasterComponent]
})
export class FeedbackModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FeedbackModule,
      providers: [FeedbackService]
    };
  }
}
