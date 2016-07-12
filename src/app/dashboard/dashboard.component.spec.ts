import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockedProviders } from '../_core/mocks/mocked-providers.spec';
import { DashboardComponent } from './dashboard.component';

describe('Dashboard.Component', () => {

    beforeEach(() => {
        MockedProviders.init();
    });

    it('should create the component',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(DashboardComponent).then((fixture: ComponentFixture<DashboardComponent>) => {
                expect(fixture.componentInstance instanceof DashboardComponent).toBe(true, 'should create DashboardComponent');
            });
        })
    );

    it('component should have link and router outlet',
        inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.createAsync(DashboardComponent).then((fixture: ComponentFixture<DashboardComponent>) => {
                let h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
                expect(h1.innerHTML).toMatch(/I am dashboard component/);
            });
        })
    );
});
