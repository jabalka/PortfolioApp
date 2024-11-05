import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppbarComponent } from './appbar/appbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
import { SidenavService } from './sidenav.service';
import { HomeButtonsComponent } from './partial components/home-buttons/home-buttons.component';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { AuthService } from '../client/auth.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CreatePasswordComponent } from './create-password/create-password.component';

const COMPONENTS = [
  AppbarComponent,
  SidenavComponent,
  HomeButtonsComponent,
  GoogleSigninComponent,
  CreateAccountComponent,
  CreatePasswordComponent,
]

const MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  AppRoutingModule,
  MatIconModule,
  MatButtonModule,
  SocialLoginModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,

  CommonModule,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES,
  ],
  providers: [
    SidenavService,
    AuthService,
    provideNativeDateAdapter(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { // google custom provider
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1098559010826-fft7bocupbv0392qhguldunocgua0t5m.apps.googleusercontent.com', {
              scopes: 'openid profile email',
              oneTapEnabled: true,
            }),
          },
            // apple custom provider
          // {
          //   id: AppleLoginProvider.PROVIDER_ID,
          //   provider: new AppleLoginProvider(
          //     'Apple_Client_ID-NEEDS TO BE CHANGEWD!',
          //     {
          //       scopes: 'openid name email',
          //       prompt: 'consent',
          //       oneTapEnabled: true
          //     }
          //   )
          // }
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule { }
