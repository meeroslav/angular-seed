import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'buttons', loadChildren: './buttons/buttons.module#ButtonsModule' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
