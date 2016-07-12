import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';

import { ILanguageConfig }  from './language-config.interface';

export interface IAppConfig {
    languages: ILanguageConfig;
}

@Injectable()
export class AppConfig {
    data: IAppConfig;

    private order: { [environment: string]: Array<string> } = {
        'prod': ['prod'],
        'dev': ['dev', 'prod']
    };

    /**
     * CTOR
     * @param http: Http
     */
    constructor(private http: Http) {}

    /**
     * Loads a config data and returns a http promise
     */
    load(): Promise<{}> {
        return new Promise((resolve: any, reject: any) => {
            this.http.get('configs/configs.json')
                .map((res: Response) => {
                    return this.combineProperties(res.json());
                })
                .subscribe((envData: IAppConfig) => {
                    this.data = envData;
                    resolve();
                });
        });
    }

    /**
     * Combines list of properties according to environment priority order
     * @param response: any
     */
    private combineProperties(response: any) {
        const currentEnvironment = this.getEnvironment();
        const currentEnvironmentOrder = this.order[currentEnvironment].reverse();
        if (!currentEnvironmentOrder) {
            throw `Error in Generic Configuration settings. Parsing order for ${currentEnvironment} not found.`;
        }
        if (!currentEnvironmentOrder.length) {
            throw `Error in Generic Configuration settings. No order defined for ${currentEnvironment}.`;
        }
        let mergedResult = {};
        Object.keys(response).forEach((configKey: string) => {
            let mergedConfig = {};
            currentEnvironmentOrder.forEach((environment: string) => {
                const environmentResponse = response[configKey][environment];
                if (environmentResponse && typeof environmentResponse === 'object') {
                    Object.keys(environmentResponse).forEach((key: string) => {
                        mergedConfig[key] = environmentResponse[key];
                    });
                }
            });
            mergedResult[configKey] = mergedConfig;
        });

        return mergedResult;
    }

    /**
     * Get current set environment
     * todo: Should be enhanced in the future
     */
    private getEnvironment(): string {
        return window['development_mode'] ? 'dev' : 'prod';
    }
}
