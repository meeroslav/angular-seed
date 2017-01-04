import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'buttons', loadChildren: './buttons/buttons.module#ButtonsPageModule' },
  { path: 'forms', loadChildren: './forms/forms.module#FormsPageModule' },
  { path: 'cards', loadChildren: './cards/cards.module#CardsPageModule' },
  { path: 'table', loadChildren: './table/table.module#TablePageModule' },
  { path: 'misc', loadChildren: './miscellaneous/miscellaneous.module#MiscPageModule' },
  { path: 'colors', loadChildren: './colors/colors.module#ColorsPageModule' },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
