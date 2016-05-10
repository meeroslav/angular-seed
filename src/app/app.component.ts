import 'reflect-metadata';
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';

@Component({
	selector: 'app',
	template: `
	<p>This is Angular APP</p>
	<nav>
		<a [routerLink]="['/']">Home</a> |
		<a [routerLink]="['/login']">Login</a> |
		<a [routerLink]="['/games']">Games</a>
	</nav>
	<router-outlet></router-outlet>
	`,
	directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
	{ path: '/', component: HomeComponent },
	{ path: '/games', component: GamesComponent },
	{ path: '/login', component: LoginComponent },
	// default view
	{ path: '*', component: HomeComponent }
])
export class AppComponent {
	constructor() {
		// somthing to happen
	}

}
