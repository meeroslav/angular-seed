import { TestBed } from '@angular/core/testing';
import { InfieldLabelDirective } from './infield-label.directive';
import { Component } from '@angular/core';

@Component({
    template: `
      <input id="id1" [infield-label]="labelText"/>
    `
})
class TestComponent {
    labelText = 'Some text';
}

@Component({
    template: `
      <select id="id1" [infield-label]="labelText">
        <option value="ABC">ABC</option>
        <option value="DEF">DEF</option>
      </select>
    `
})
class TestSelectComponent {
    labelText = 'Some text';
}

describe('[infield-label] directives', () => {

    describe('input component', () => {
        let fixture, component;

        beforeEach(() => {
            let module = TestBed.configureTestingModule({
                declarations: [InfieldLabelDirective, TestComponent]
            });

            fixture = module.createComponent(TestComponent);
            component = fixture.componentInstance;
        });

        it('should wrap input in label', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;

            expect(wrapper.nodeName).toEqual('SPAN');
            expect(wrapper.className).toEqual('infield-label-wrapper');
            expect(wrapper.lastElementChild.nodeName).toEqual('LABEL');
            expect(wrapper.lastElementChild.innerHTML).toEqual(component.labelText);
        });

        it('should not wrap input if no text provided', () => {
            component.labelText = null;
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;

            expect(wrapper.nodeName).not.toEqual('SPAN');
            expect(wrapper.className).not.toEqual('infield-label-wrapper');
        });

        it('should toggle placeholder on value and keyup', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;
            let inputElem = wrapper.firstElementChild;
            inputElem.value = 'ABC';
            inputElem.dispatchEvent(new Event('keyup'));
            fixture.detectChanges();

            expect(wrapper.className).toMatch(/guide-on/);
        });

        it('should toggle placeholder on value and change', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;
            let inputElem = wrapper.firstElementChild;
            inputElem.value = 'ABC';
            inputElem.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(wrapper.className).toMatch(/guide-on/);
        });

        it('should toggle placeholder off on no value and change', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;
            let inputElem = wrapper.firstElementChild;
            inputElem.value = 'ABC';
            inputElem.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            inputElem.value = '';
            inputElem.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(wrapper.className).not.toMatch(/guide-on/);
        });
    });

    describe('select component', () => {
        let fixture, component;

        beforeEach(() => {
            let module = TestBed.configureTestingModule({
                declarations: [InfieldLabelDirective, TestSelectComponent]
            });

            fixture = module.createComponent(TestSelectComponent);
            component = fixture.componentInstance;
        });

        it('should set guide-on when element is selected', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;

            fixture.detectChanges();

            expect(wrapper.className).toMatch(/guide-on/);
        });

        it('should wrap select in label', () => {
            fixture.detectChanges();
            let wrapper = fixture.nativeElement.firstElementChild;
            let select = wrapper.firstElementChild;
            select.selectedIndex = -1;
            select.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            expect(wrapper.nodeName).toEqual('SPAN');
            expect(wrapper.className).toEqual('infield-label-wrapper');
            expect(wrapper.lastElementChild.nodeName).toEqual('LABEL');
            expect(wrapper.lastElementChild.innerHTML).toEqual(component.labelText);
        });
    });
});
