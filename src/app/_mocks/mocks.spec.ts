import { MockedHelpers } from './mocked-helpers.spec';
import { Injectable } from '@angular/core';

@Injectable()
export class Mocks {
    static guid = MockedHelpers.guid;
}
