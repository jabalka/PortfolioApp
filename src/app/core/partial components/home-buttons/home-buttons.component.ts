import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GoogleAuthService } from '../../../client/google-auth.service';
import { Subscription } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../../../client/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountComponent } from '../../create-account/create-account.component';
import { CreatePasswordComponent } from '../../create-password/create-password.component';
import { UserModel } from '../../../store/user/User.model';

@Component({
  selector: 'app-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css',
})
export class HomeButtonsComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  socialUser!: SocialUser | null;
  errorMessage: string = '';
  // get it frrom the store.select((state) => state.auth.currentUser)
  //  currentUser$ = 
  userData: UserModel = {           
    username: '',            
    email: '',             
    phone: 0,                     
    name: '', 
    password: '', 
  }

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    public googleAuthService: GoogleAuthService,
    private matIconRegistry: MatIconRegistry,
    private domSenitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
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
//  needs to implement its own functionality
  createAccount(){
    this.openCreateDialog();
  }

  openCreateDialog(): void {
    const createAccountDialog = this.dialog.open(CreateAccountComponent);
    createAccountDialog.afterClosed().subscribe(result => {
      console.log('home-button ln76.,:', result.name, result.email, result.phone, result.dob);
      // if returns true value
      if(result){
        this.userData.name = result.name;
        result.email && (this.userData.email = this.userData.username = result.email);
        result.phone && (this.userData.phone = this.userData.username = result.phone);

        // opens the second dialog to choose Password
        console.log('home-button ln95,:', this.userData)
        this.openChoosePasswordDialog();
      }
    })
  }

  openChoosePasswordDialog(): void {
    const choosePassDialog = this.dialog.open(CreatePasswordComponent);

    choosePassDialog.afterClosed().subscribe(result => {
      // if returns true value
      if(result){
        this.userData.password = result.password;
        console.log('home-button ln108,:', this.userData)
        this.authService.signUp(this.userData)
        // create the User e.g. authService.createUser()
      }
    })
  }
     
}






