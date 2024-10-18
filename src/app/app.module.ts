import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const MODULES = [
  AppRoutingModule,
  
  BrowserModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,

  CoreModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
  ],
  imports: [
    ...MODULES,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
