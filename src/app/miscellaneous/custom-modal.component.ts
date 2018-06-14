import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';

@Component({
  selector: 'custom-modal',
  template: `
    This component is custom.<br/>
    This data came from parent: <b>{{parentInfo}}</b>
  `
})
export class CustomModalComponent implements IModalDialog {
  parentInfo: string;

  dialogInit(reference: ComponentRef<IModalDialog>, options?: Partial<IModalDialogOptions<string>>) {
    this.parentInfo = options.data;
  }
}
