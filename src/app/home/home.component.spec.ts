import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockedProviders } from '../_core/mocks/mocked-providers.spec';
import { HomeComponent } from './home.component';

describe('Home.Component', () => {

    beforeEach(() => {
        MockedProviders.init();
    });

    it('should create the component',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(HomeComponent).then((fixture: ComponentFixture<HomeComponent>) => {
                expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');
            });
        })
    );

    it('component should have link and router outlet',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(HomeComponent).then((fixture: ComponentFixture<HomeComponent>) => {
                let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
                expect(h1.innerHTML).toMatch(/I am home component/);
            });
        })
    );
});
