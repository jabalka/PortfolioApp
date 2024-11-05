import { NgModule } from '@angular/core';
import Parse from 'parse/node';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { environment } from '../environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LoadingComponent } from './shared/loading/loading.component';

const MODULES = [
  AppRoutingModule,
  
  BrowserModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  MatProgressSpinnerModule,

  CoreModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
    LoadingComponent,

  ],
  imports: [
    ...MODULES,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    Parse.initialize(environment.parseAppId, environment.parseJavascriptKey);
    Parse.serverURL = environment.parseServerUrl;
  }
}
