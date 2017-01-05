import { NgModule, ModuleWithProviders } from '@angular/core';

// components and directives
import { ModalDialogComponent } from './modal-dialog.component';
import { ModalDialogService } from './modal-dialog.service';
import { SimpleModalComponent } from './simple-modal.component';
// modules
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ TranslateModule, CommonModule ],
    declarations: [ ModalDialogComponent, SimpleModalComponent ],
    entryComponents: [ ModalDialogComponent, SimpleModalComponent ],
    exports: [ ModalDialogComponent, SimpleModalComponent ]
})
export class ModalDialogModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalDialogModule,
            providers: [ ModalDialogService ]
        };
    }
}
