import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Error404Component } from './404.component';
import {MockedTranslatePipe} from '../../../_mocks/translate.mock.spec';

describe('Error404.Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ Error404Component, MockedTranslatePipe ]
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(Error404Component);
        expect(fixture.componentInstance instanceof Error404Component).toBe(true, 'should create Error404Component');
    });

    it('should have 404 text in heading', () => {
        let fixture = TestBed.createComponent(Error404Component);
        fixture.detectChanges();
        let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(h1.innerText).toEqual('error.404_ERROR_HEADING', '<h1> should contain 404 text');
    });

    it('should create the link for the component', () => {
        let comp = new Error404Component();
        expect(comp.linkEnd).toEqual('</a>', 'link end should be </a>');
        expect(comp.linkStart).toEqual('<a href="/">', 'link start should have routerLink');
    });
});
