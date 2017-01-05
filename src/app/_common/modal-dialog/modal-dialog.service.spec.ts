import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IModalDialog, IModalDialogOptions, } from './modal-dialog.interface';

import { ModalDialogComponent } from './modal-dialog.component';
import { MockedTranslatePipe } from '../../_mocks/translate.mock.spec';
import { ModalDialogService } from './modal-dialog.service';

let compRef = {
    instance: {
        dialogInit: (reference: ComponentRef<IModalDialog>, options?: IModalDialogOptions) => { /**/ }
    },
    destroy() { }
};

class MockedViewContainerRef {
    createComponent(input: string) { return compRef; }
}

class MockedComponentFactoryResolver {
    resolveComponentFactory(type: any): string { return typeof type; }
}

describe('ModalDialog.Service: ', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                ModalDialogService,
                { provide: ViewContainerRef, useClass: MockedViewContainerRef },
                { provide: ComponentFactoryResolver, useClass: MockedComponentFactoryResolver }
            ],
            declarations: [ModalDialogComponent, MockedTranslatePipe]
        });
    });

    //let component;
    let componentFactoryResolver;
    let viewRef;

    beforeEach(() => {
        componentFactoryResolver = new MockedComponentFactoryResolver();
        viewRef = new MockedViewContainerRef();
    });

    it('should create DataCenterService', () => {
        let service = new ModalDialogService(componentFactoryResolver);
        expect(service.openDialog).toBeDefined();
    });

    it('should call DynamicComponentLoader.loadNextToLocation on openDialog', () => {

        //arrange
        let service = new ModalDialogService(componentFactoryResolver);
        let options = { title: 'ABC' };

        //act
        spyOn(componentFactoryResolver, 'resolveComponentFactory').and.callThrough();
        spyOn(compRef.instance, 'dialogInit').and.stub();
        spyOn(compRef, 'destroy');

        service.openDialog(viewRef, options);

        //assert
        expect(componentFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(ModalDialogComponent);
        expect(compRef.instance.dialogInit).toHaveBeenCalledWith(compRef, options);

        //Assert that the destroy has been called in the compRef
        service.openDialog(viewRef, options);
        expect(compRef.destroy).toHaveBeenCalled();
    });
});
