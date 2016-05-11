import 'reflect-metadata';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { GameListComponent } from './game-list.component';
import { GameDetailComponent } from './game-detail.component';

@Component({
	template: `
	<h1>
		<a [routerLink]="['/games']">{{ 'GAMES' | translate }}</a>
	</h1>
	<router-outlet></router-outlet>
	`,
	pipes: [ TranslatePipe ],
	directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
	{path: '', component: GameListComponent}, // , useAsDefault: true},
	{path: '/:id', component: GameDetailComponent}
])
export class GamesComponent {
}
