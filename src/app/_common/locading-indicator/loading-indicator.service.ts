export interface IIndicatorStatus {
  isInProgress: boolean;
}

export class LoadingIndicatorService {
  status: IIndicatorStatus = {
    isInProgress: false
  };
  private counter: number;
  private timer: any;

  /**
   * CTOR
   */
  constructor() {
    this.counter = 0;
  }

  /**
   * Add new loading indicator to queue
   */
  start() {
    if (++this.counter === 1) {
      // show progress indicator with slight delay for page switching
      this.timer = window.setTimeout(() => {
        this.status.isInProgress = true;
      }, 250);
    }
  }

  /**
   * Remove loading indicator from queue
   */
  done() {
    if (this.counter > 0) {
      if (--this.counter === 0) {
        clearTimeout(this.timer);
        this.timer = null;
        this.status.isInProgress = false;
      }
    }
  }
}
