import 'reflect-metadata';
import { Component } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

@Component({
	template: `
	<h2>I am player {{player}}</h2>
	`
})
export class GameDetailComponent implements OnActivate {
	player: Number;

	routerOnActivate(curr: RouteSegment) {
		let id = +curr.getParam('id');

		this.player = id;
	}
}
