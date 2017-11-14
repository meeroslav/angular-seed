import { NgModule, ModuleWithProviders } from '@angular/core';

// components and directives
import { DispatcherService } from './dispatcher.service';

@NgModule({
  providers: [DispatcherService]
})
export class DispatcherModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DispatcherModule,
      providers: [DispatcherService]
    };
  }
}
