import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '../_common/custom-components/custom-components.module';
import { CommonModule } from '@angular/common';

let routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule.forChild(routes),
    CustomComponentsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
