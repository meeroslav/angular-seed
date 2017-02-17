import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TypefacesComponent } from './typefaces.component';
import { TranslateModule } from 'ng2-translate';

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
