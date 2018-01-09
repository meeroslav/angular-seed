import { Injectable } from '@angular/core';
import { FeedbackService } from '../feedback';

@Injectable()
export class ErrorService {
  errorHandler: ErrorHandler;

  /**
   * CTOR
   * @param feedbackService
   */
  constructor(private feedbackService: FeedbackService) {
    this.errorHandler = new ErrorHandler();
  }

  public init(error): ErrorService {
    this.errorHandler.init(error);
    return this;
  }

  public handle(statusCode: number, callbackfn: (value: any) => boolean, translationId: string): ErrorService {
    this.errorHandler.handle(statusCode, callbackfn, translationId);
    return this;
  }

  public notify() {
    this.feedbackService.notify({ heading: this.errorHandler.execute(), type: 'danger' });
  }
}

class ErrorHandler {
  private rules: IRule[] = [];
  private defaultRules: IRule[] = [
    { statusCode: 400, callbackfn: (e: any) => true, translationId: 'ERROR.BAD_REQUEST' },
    { callbackfn: (e: any) => true, translationId: 'ERROR.GENERAL_FAIL' }
  ];
  private error: any;

  public init(error): ErrorHandler {
    this.rules = [];
    this.error = error;
    return this;
  }

  public handle(statusCode: number, callbackfn: (value: any) => boolean, translationId: string): ErrorHandler {
    this.rules.push({ statusCode, callbackfn, translationId });
    return this;
  }

  public execute() {
    this.rules.push(...this.defaultRules);
    for (let rule of this.rules) {
      if ((!rule.statusCode || rule.statusCode === this.error.status) && rule.callbackfn(this.error)) {
        return rule.translationId;
      }
    }
  }
}

interface IRule {
  statusCode?: number;
  callbackfn: (value: any) => boolean;
  translationId: string;
}
