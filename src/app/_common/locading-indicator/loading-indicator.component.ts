import { LoadingIndicatorService, IIndicatorStatus } from './loading-indicator.service';
import { Component } from '@angular/core';

@Component({
    selector: 'loading-indicator',
    template: `
        <div id="loading-indicator" class="overlay" *ngIf="indicatorStatus.isInProgress">
            <div></div>
        </div>
    `
})
export class LoadingIndicatorComponent {
    indicatorStatus: IIndicatorStatus;

    constructor(loadingIndictorService: LoadingIndicatorService) {
        this.indicatorStatus = loadingIndictorService.status;
    }
}
