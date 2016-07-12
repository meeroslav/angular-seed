import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'error-404-component',
    template: `
    <div id="error-page">
        <div id="error-logo">
            <span class="monster-layer" *ngFor="let m of [1,2,3,4,5]">
                <span class="monster-eye"></span>
                <span class="app-icon-monster monster"></span>
                <span class="monster-retina"></span>
            </span>
        </div>
        <h1 id="error-heading">404</h1>
        <p>{{ 'error.404_ERROR_MESSAGE' | translate}}</p>
        <span [innerHTML]="'error.GO_TO_PAGE' | translate:{linkStart: linkStart, linkEnd: linkEnd}"></span>
    </div>
    `,
    pipes: [ TranslatePipe ],
    directives: [ ROUTER_DIRECTIVES ]
})
export class Error404Component {
    linkStart: string;
    linkEnd: string;

    constructor() {
        this.linkStart = '<a [routerLink]="[\'\']">';
        this.linkEnd = '</a>';
    }
}
