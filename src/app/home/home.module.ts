import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslateModule } from 'ng2-translate';
import { CustomComponentsModule } from '../_common/custom-components/custom-components.module';

let routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes),
    CustomComponentsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
