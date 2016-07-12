/* tslint:disable:no-unused-variable */
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// import { provide }        from '@angular/core';
// import { ViewMetadata }   from '@angular/core';
// import { PromiseWrapper } from '@angular/core/src/facade/promise';

import { MockedProviders } from '../_core/mocks/mocked-providers.spec';
import { Error404Component } from './404.component';

describe('Error404.Component', () => {

    beforeEach(() => {
        MockedProviders.init();
    });

    it('should create the component',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(Error404Component).then((fixture: ComponentFixture<Error404Component>) => {
                expect(fixture.componentInstance instanceof Error404Component).toBe(true, 'should create Error404Component');
            });
        })
    );

    it('should have 404 text in heading',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(Error404Component).then((fixture: ComponentFixture<Error404Component>) => {
                let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
                expect(h1.innerText).toEqual('404', '<h1> should contain 404 text');
            });
        })
    );

    it('should create the link for the component', () => {
        let comp = new Error404Component();
        expect(comp.linkEnd).toEqual('</a>', 'link end should be </a>');
        expect(comp.linkStart).toEqual('<a [routerLink]="[\'\']">', 'link start should have routerLink');
    });
});
