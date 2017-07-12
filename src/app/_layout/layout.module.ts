import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

// components and directives
import { HeaderComponent } from './header.component';
import { MainNavComponent } from './mainnav.component';
import { MainNav } from './mainnav.service';
import { SharedModule } from '../_common/shared/shared.module';

@NgModule({
  imports: [TranslateModule, CommonModule, RouterModule, SharedModule],
  declarations: [HeaderComponent, MainNavComponent],
  providers: [MainNav],
  exports: [HeaderComponent, MainNavComponent]
})
export class LayoutModule { }
