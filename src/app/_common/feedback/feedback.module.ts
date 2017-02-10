import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
import { ToasterComponent } from './toaster.component';

@NgModule({
  imports: [CommonModule],
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
