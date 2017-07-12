import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TypefacesComponent } from './typefaces.component';
import { TranslateModule } from '@ngx-translate/core';

let routes = [
  { path: '', component: TypefacesComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TypefacesComponent]
})
export class TypefacesPageModule { }
