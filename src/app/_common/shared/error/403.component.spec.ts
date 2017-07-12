import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {MockedTranslatePipe} from '../../../_mocks/translate.mock.spec';
import { Error403Component } from './403.component';

describe('Error403.Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ Error403Component, MockedTranslatePipe ]
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(Error403Component);
        expect(fixture.componentInstance instanceof Error403Component).toBe(true, 'should create Error403Component');
    });

    it('should have 404 text in heading', () => {
        let fixture = TestBed.createComponent(Error403Component);
        fixture.detectChanges();
        let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(h1.innerText).toEqual('error.403_ERROR_HEADING', '<h1> should contain 403 text');
    });

    it('should create the link for the component', () => {
        let comp = new Error403Component();
        expect(comp.linkEnd).toEqual('</a>', 'link end should be </a>');
        expect(comp.linkStart).toEqual('<a href="/">', 'link start should have routerLink');
    });
});

