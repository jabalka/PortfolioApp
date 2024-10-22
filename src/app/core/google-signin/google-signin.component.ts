import { Component, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../client/auth.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.css'
})
export class GoogleSigninComponent {
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
  ){  }

  createFakeGoogleWrapper = () => {
//     if(isPlatformBrowser(this.platformId)){
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.referrerPolicy = 'strict-origin-when-cross-origin'
//       script.async = true;
//       script.defer = true;   
//       document.body.appendChild(script);
// }  
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }

}
