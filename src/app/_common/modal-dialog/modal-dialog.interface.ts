import {ComponentRef } from '@angular/core';

export interface IModalDialog {
    dialogInit: (reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) => void ;
}

export interface IModalDialogOptions {
    title?: string;
    childComponent?: any;
    onClose?: () => Promise<any>;
    prompt?: IModalDialogPrompt;
    data?: any;
}

export interface IModalDialogPrompt {
    textOk?: string;
    onPromptOk: () => Promise<any>;
    textCancel?: string;
    onPromptCancel?: () => Promise<any>;
}

