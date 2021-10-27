import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class LayoutModule { }
