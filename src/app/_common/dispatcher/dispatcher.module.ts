import { NgModule, ModuleWithProviders } from '@angular/core';

// components and directives
import { DispatcherService } from './dispatcher.service';
import { SelectionDispatcher } from './selection-dispatcher.service';

@NgModule({
    providers: [ DispatcherService, SelectionDispatcher ],
})
export class DispatcherModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DispatcherModule,
            providers: [ DispatcherService, SelectionDispatcher ]
        };
    }
}
