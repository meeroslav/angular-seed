import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'dashboard-component',
    template: `
    <h1>
        I am dashboard component
    </h1>
    `,
    pipes: [ TranslatePipe ],
    directives: [ ROUTER_DIRECTIVES ]
})
export class DashboardComponent {
}
