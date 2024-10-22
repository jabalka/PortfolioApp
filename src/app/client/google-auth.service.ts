import { Inject, Injectable, Output, PLATFORM_ID, EventEmitter } from '@angular/core';
import { isPlatformBrowser  } from '@angular/common';

declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  // the CLientId will be stored in the .ENV file and just the last google URRL will remain
  private clientId = '1098559010826-fft7bocupbv0392qhguldunocgua0t5m.apps.googleusercontent.com';

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
  ) { 
   }

   @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

   createFakeGoogleWrapper = () => {
    if(isPlatformBrowser(this.platformId)){
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.referrerPolicy = 'strict-origin-when-cross-origin'
            script.async = true;
            script.defer = true;   
            document.body.appendChild(script);
    }  
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




  //  loadGoogleIdentityService(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     if (typeof google !== 'undefined') {
  //       resolve(); // Google script is already loaded
  //       return;
  //     }
  //     if(isPlatformBrowser(this.platformId)){
  //       const script = document.createElement('script');
  //       script.src = 'https://accounts.google.com/gsi/client';
  //       script.async = true;
  //       script.defer = true;
  
  //       script.onload = () => {
  //         this.initializeGoogleLogin();
  //         resolve(); // Script loaded and initialized
  //       };
  //       script.onerror = () => reject('Google Identity Service script could not be loaded.');
  //       document.body.appendChild(script);
  //     } else {
  //       reject('Not rrunnign in a browser envvironment!');
  //     }

  //   });
  // }

  // initializeGoogleLogin(): void {
  //   google.accounts.id.initialize({
  //     client_id: this.clientId,
  //     callback: this.handleCredentialResponse.bind(this)
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById('google-signin-button'),
  //     { theme: 'outline', size: 'large' }
  //   );
  // }

  // handleCredentialResponse(response: any) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   // Handle the ID token, e.g., send it to your server for verification
  // }

  // triggerGoogleSignIn() {
  //   google.accounts.id.prompt(); // This will show the Google sign-in prompt
  // }


}
