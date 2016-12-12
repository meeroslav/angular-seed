import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
