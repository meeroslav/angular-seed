import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'home-component',
    template: `
    <h1>
        I am home component
    </h1>
    `,
    pipes: [ TranslatePipe ],
    directives: [ ROUTER_DIRECTIVES ]
})
export class HomeComponent {
}
