import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TypefacesComponent } from './typefaces.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../_common/shared/shared.module';

let routes = [
  { path: '', component: TypefacesComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TypefacesComponent]
})
export class TypefacesPageModule { }
