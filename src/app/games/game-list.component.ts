import 'reflect-metadata';
import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';

@Component({
    selector: 'game-list-component',
    template: `
    <ul>
        <li *ngFor="let player of [1,2,3,4,5]">
            <a (click)="onSelect(player)">Player {{player}}</a>
        </li>
    </ul>
    `
})
export class GameListComponent implements OnActivate {
    players: Number[];
    private currSegment: RouteSegment;
    private selectedId: number;

    constructor(
        private router: Router
    ) {
        this.players = [1, 2, 3, 4, 5, 6];
    }

    routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
        this.currSegment = curr;
        this.selectedId = +currTree.parent(curr).getParam('id');
    }

    onSelect(player: Number): void {
        // absolute link
        // this.router.navigate([`/crisis-center`, crisis.id]);

        // relative link
        this.router.navigate([`./${player}`], this.currSegment);
    }
}
