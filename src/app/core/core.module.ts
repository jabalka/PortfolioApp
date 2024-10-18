import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './appbar/appbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { SidenavService } from './sidenav.service';
import { HomeButtonsComponent } from './partial components/home-buttons/home-buttons.component';

const COMPONENTS = [
  AppbarComponent,
  SidenavComponent,
  HomeButtonsComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,

    CommonModule,
  ],
  providers: [
    SidenavService,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule { }
