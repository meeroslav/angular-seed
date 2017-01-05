import {
  Component,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { IModalDialog, IModalDialogOptions, IModalDialogPrompt } from './modal-dialog.interface';

/**
 * Modal dialog component
 * Usage:
 *      dynamicComponentLoader.loadNextToLocation(ModalDialogComponent, viewContainerRef)
 *           .then((ref: ComponentRef<ModalDialogComponent>) => {
 *               ref.instance.prepare(ref, headerTitle, model);
 *           });
 * Model properties are:
 *      template: string that represents dialog template
 *      onClose: method to run before dialog gets destroyed
 *      *: what ever properties or methods that should be visible to template (accessible with model.propertyName)
 */
@Component({
  selector: 'modal-dialog',
  template: `
    <div class="modal-backdrop fade in" (click)="!prompt && close()"></div>
    <div class="modal fade in">
      <div class="modal-content" [ngClass]="{'shake': alert}">
        <div class="modal-header">
          <button (click)="close()" *ngIf="!prompt" type="button"
            [title]="'CLOSE' | translate"
            class="close app-icon-close">
          </button>
          <h4>{{title | translate}}</h4>
        </div>
        <div  class="modal-body">
          <i #modalDialogBody class="pointer"></i>
        </div>
        <div class="modal-footer" *ngIf="prompt">
          <button (click)="accept()" class="btn btn-primary">{{(prompt.textOk || 'YES') | translate}}</button>
          <button (click)="decline()" class="btn btn-secondary">{{(prompt.textCancel || 'CANCEL') | translate}}</button>
        </div>
      </div>            
    </div>
    `
})
export class ModalDialogComponent implements IModalDialog, OnDestroy {
  @ViewChild('modalDialogBody', { read: ViewContainerRef })
  protected dynamicComponentTarget: ViewContainerRef;
  protected reference: ComponentRef<IModalDialog>;

  title: string;
  onClose: () => Promise<any>;
  prompt: IModalDialogPrompt;
  data: any;

  private inProgress = false;
  private childInstance: any;
  private alert: boolean = false;

  private timeout: number;
  private TIMEOUT_DELAY = 250;

  /**
   * CTOR
   * @param componentFactoryResolver
   */
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  /**
   * Initialize dialog with reference to instance and options
   * @param reference
   * @param options
   */
  dialogInit(reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) {
    this.reference = reference;

    // inject component
    if (options && options.childComponent) {
      let factory = this.componentFactoryResolver.resolveComponentFactory(options.childComponent);
      let componentRef = this.dynamicComponentTarget.createComponent(factory) as ComponentRef<IModalDialog>;
      this.childInstance = componentRef.instance as IModalDialog;

      this.childInstance['dialogInit'](componentRef, options);
      (document.activeElement as HTMLElement).blur();
    }
    // set options
    this.setOptions(options);
  }

  /**
   * Method to run on prompt accept
   */
  accept() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;

    if (!this.prompt) {
      this.reference.destroy();
      this.inProgress = false;
      return;
    }
    this.prompt.onPromptOk().then(() => {
      this.inProgress = false;
      this.reference.destroy();
    }, () => {
      this.alert = true;
      this.timeout = window.setTimeout(() => {
        this.alert = false;
        this.inProgress = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }, this.TIMEOUT_DELAY);
    });
  }

  /**
   * Method to run on prompt decline
   */
  decline() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;

    if (!this.prompt || !this.prompt.onPromptCancel) {
      this.reference.destroy();
      this.inProgress = false;
      return;
    }
    this.prompt.onPromptCancel().then(() => {
      this.reference.destroy();
      this.inProgress = false;
    }, () => {
      this.alert = true;
      this.timeout = window.setTimeout(() => {
        this.alert = false;
        this.inProgress = false;
        clearTimeout(this.timeout);
        this.timeout = null;
      }, this.TIMEOUT_DELAY);
    });
  }

  /**
   * Method to run on close
   * if prompt or onCancel are defiend, it will run them before destroying component
   */
  close() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;

    if (this.prompt && this.prompt.onPromptCancel) {
      this.prompt.onPromptCancel().then(() => {
        this.reference.destroy();
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      });
      return;
    }
    if (this.onClose) {
      this.onClose().then(() => {
        this.reference.destroy();
        this.inProgress = false;
      });
      return;
    }
    this.reference.destroy();
    this.inProgress = false;
  }

  /**
   * Cleanup of destroy
   */
  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Pass options from dialog setup to component
   * @param  {IModalDialogOptions} options?
   */
  private setOptions(options?: IModalDialogOptions) {

    if (options && options.onClose && options.prompt) {
      throw new Error(`OnClose and Prompt are not allowed to be defined on the same dialog.`);
    }
    // set references
    this.title = options && options.title || '';
    this.onClose = options && options.onClose || null;
    this.prompt = (this.childInstance && this.childInstance['prompt']) ||
      (options && options.prompt) || null;
    this.data = options && options.data || null;
  }
}
