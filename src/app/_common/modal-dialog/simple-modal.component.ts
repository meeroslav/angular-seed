import { Component, ComponentRef }           from '@angular/core';
import { IModalDialog, IModalDialogOptions }  from './modal-dialog.interface';

@Component({
    selector: 'data-center',
    template: `
        <div [innerHTML]="text | translate:textParams"></div>
    `
})
export class SimpleModalComponent implements IModalDialog {
    text: string;
    textParams: any = {};

    dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
        if (!options || !options.data) {
            throw new Error(`Data information for simple modal dialog is missing`);
        }
        this.text = options.data.text;
        this.textParams = options.data.textParams || {};
    }
}
