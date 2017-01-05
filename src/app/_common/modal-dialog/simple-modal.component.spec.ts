import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleModalComponent } from './simple-modal.component';
import { MockedTranslatePipe } from '../../_mocks/translate.mock.spec';

let fixture: ComponentFixture<SimpleModalComponent>;

describe('SimpleModal.Component: ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleModalComponent, MockedTranslatePipe]
        });
        fixture = TestBed.createComponent(SimpleModalComponent);
    });

    it('should create component', () => {
        expect(fixture).toBeDefined();
    });

    it('should create component and pass text', () => {
        let testText = 'SOME TEXT';
        let instance = fixture.componentInstance;
        instance.dialogInit(fixture.componentRef, {
            data: { text: testText }
        });
        fixture.detectChanges();
        let span = fixture.debugElement.query(By.css('div')).nativeElement;

        expect(span.innerHTML).toEqual(testText);
    });
    it('should throw exception if no data in options', () => {
        let instance = fixture.componentInstance;

        expect(() => {
            instance.dialogInit(fixture.componentRef, {});
        }).toThrowError(/Data information for simple modal dialog is missing/);
    });
    it('should throw exception if no options', () => {
        let instance = fixture.componentInstance;

        expect(() => {
            instance.dialogInit(fixture.componentRef);
        }).toThrowError(/Data information for simple modal dialog is missing/);
    });
});
