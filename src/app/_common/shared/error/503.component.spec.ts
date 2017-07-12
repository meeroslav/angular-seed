import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {MockedTranslatePipe} from '../../../_mocks/translate.mock.spec';
import { Error503Component } from './503.component';

describe('Error503.Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ Error503Component, MockedTranslatePipe ]
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(Error503Component);
        expect(fixture.componentInstance instanceof Error503Component).toBe(true, 'should create Error503Component');
    });

    it('should have 404 text in heading', () => {
        let fixture = TestBed.createComponent(Error503Component);
        fixture.detectChanges();
        let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(h1.innerText).toEqual('error.503_ERROR_HEADING', '<h1> should contain 503 text');
    });
});
