export class LoadingIndicatorService {
    status: IIndicatorStatus = {
        isInProgress: false
    };
    private counter: number;
    private timer: any;

    constructor() {
        this.counter = 0;
    }

    start() {
        if (++this.counter === 1) {
            // show progress indicator with slight delay for page switching
            this.timer = setTimeout(() => {
                this.setIndicator();
            }, 250);
        }
    }

    done() {
        if (this.counter > 0) {
            if (--this.counter === 0) {
                clearTimeout(this.timer);
                this.timer = null;
                this.status.isInProgress = false;
            }
        }
    }

    private setIndicator() {
        this.status.isInProgress = true;
    }
}

export interface IIndicatorStatus {
    isInProgress: boolean;
}
