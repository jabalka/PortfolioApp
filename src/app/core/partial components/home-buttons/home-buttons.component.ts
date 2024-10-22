import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GoogleAuthService } from '../../../client/google-auth.service';
import { Subscription } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../../../client/auth.service';

@Component({
  selector: 'app-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css',
})
export class HomeButtonsComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  socialUser!: SocialUser | null;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    public googleAuthService: GoogleAuthService,
    private matIconRegistry: MatIconRegistry,
    private domSenitizer: DomSanitizer,
  ){
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSenitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'facebook-icon',
      this.domSenitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'apple-icon',
      this.domSenitizer.bypassSecurityTrustResourceUrl('assets/icons/apple.svg')
    );
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.authSubscription = this.socialAuthService.authState.subscribe((user: SocialUser | null) => {
      this.socialUser = user;
      if(user){
        console.log('home-button ln49., Social user logged in:', user);
        this.authService.parseGoogleLogin(user);
      } else {
        console.log('home-button ln52.,  user signed out');
      }
      console.log('home-button ln54., user', user);
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
     
}






