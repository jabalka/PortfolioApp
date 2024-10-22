import { NgModule } from '@angular/core';
import Parse from 'parse/node';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { environment } from '../environments/environment';

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
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    Parse.initialize(environment.parseAppId, environment.parseJavascriptKey);
    Parse.serverURL = environment.parseServerUrl;
  }
}
