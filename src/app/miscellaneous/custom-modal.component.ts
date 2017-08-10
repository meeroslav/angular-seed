import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';

@Component({
  selector: 'custom-modal',
  template: `
    This component is custom
  `
})
export class CustomModalComponent implements IModalDialog {

  dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
    // no code needed
  }
}
