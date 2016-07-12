import { provideRouter, RouterConfig } from '@angular/router';
import { Error404Component } from './error/404.component';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: RouterConfig = [
    // default view
    { path: '', redirectTo: 'home', terminal: true },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: Error404Component }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
