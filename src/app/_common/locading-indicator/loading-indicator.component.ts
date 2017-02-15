import { LoadingIndicatorService, IIndicatorStatus } from './loading-indicator.service';
import { Component } from '@angular/core';

@Component({
    selector: 'loading-indicator',
    template: `
        <div class="loading-indicator overlay" *ngIf="indicatorStatus.isInProgress">
            <div class="loading-spinner"></div>
        </div>
    `
})
export class LoadingIndicatorComponent {
    indicatorStatus: IIndicatorStatus;

    constructor(loadingIndictorService: LoadingIndicatorService) {
        this.indicatorStatus = loadingIndictorService.status;
    }
}
