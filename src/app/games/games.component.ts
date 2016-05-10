import 'reflect-metadata';
import { Component } from '@angular/core';
// import { OnActivate, RouteSegment } from '@angular/router';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { GameListComponent } from './game-list.component';
import { GameDetailComponent } from './game-detail.component';

@Component({
	template: `
	<h1>
		<a [routerLink]="['/games']">GAMES</a>
	</h1>
	<router-outlet></router-outlet>
	`,
	directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
	{path: '', component: GameListComponent}, // , useAsDefault: true},
	{path: '/:id', component: GameDetailComponent}
])
export class GamesComponent {
}
