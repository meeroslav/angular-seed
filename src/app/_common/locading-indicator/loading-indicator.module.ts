import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingIndicatorComponent],
  exports: [LoadingIndicatorComponent]
})
export class LoadingIndicatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingIndicatorModule,
      providers: [LoadingIndicatorService]
    };
  }
}
