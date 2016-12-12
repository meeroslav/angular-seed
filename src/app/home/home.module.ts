import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslateModule } from 'ng2-translate';

let routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
