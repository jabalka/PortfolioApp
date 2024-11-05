import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import Parse from 'parse';
import { environment } from '../../environments/environment';
import { UserModel } from '../store/user/User.model';
import { Store } from '@ngrx/store';
import { IAuthUserState } from '../store/auth';
import { map } from 'rxjs';
import { login } from '../store/auth/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // currentUser$ = this.store.select((state)=> state.auth.currentUser);
  // isReady$ = this.currentUser$.pipe(map(currentUser => !!currentUser));
  constructor(
    private socialAuthService: SocialAuthService,
    // private store: Store<IAuthUserState>,
  ) {
    Parse.initialize(environment.parseAppId, environment.parseJavascriptKey);
    Parse.serverURL = environment.parseServerUrl;
  }
  // custom login
  async login(userData: UserModel): Promise<any> {
    try{
      const existingUser = await this.getUser('username', userData.username);
      if(!existingUser){
        throw new Error("User with with provided username not found!");
      }
      const loggedInUser = await Parse.User.logIn(userData.username, userData.password);
      console.log('authService ln36: ',loggedInUser)
      // return this.store.dispatch(login(loggedInUser))
    } catch(error: any){
      throw new Error("Login failed: ", error.message);
    }
  }

  // custom sign-up
  async signUp(userData: UserModel): Promise<any> {

    try{
      const userQuery = new Parse.Query(Parse.User);
      userQuery.equalTo('username', userData.email);
      const existingUser = await this.getUser('username', userData.username);

      if(existingUser){
        throw new Error('User with this email or phone number already exists!')
      } else {
        const user = new Parse.User();
        user.set('username', userData.username);
        user.set('password', userData.password);
        user.set('email', userData.email);
        user.set('phoneNumb', Number(userData.phone));
        user.set('name', userData.name);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // if both users registered with just phoneNumb then the second will get an error
        //  that user with same email exists as both will save empty string as email
        await user.signUp(); // sign up and save the new user
        return user;
      }
    } catch (err: any) {
      console.error('Error logging in with Google:', err.message);
    }
  }

  // Google login
  googleSignIn(): Promise<any> {
    return this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        return this.parseGoogleLogin(socialUser);
      });
  }

  // Parse func to login/register in Google user
  async parseGoogleLogin(socialUser: SocialUser): Promise<any> {
    console.log('authService., ln52:', socialUser);

    try {

      const existingUser = await this.getUser('googleId', socialUser.id);

      console.log('authService ., ln70: Existing User:', existingUser);

      if (existingUser) {
        // If user exists, return the user as logged in
        console.log('User already exists, logging in ln75:', existingUser);
        return existingUser;
      } else {
        // If no existing user, create and sign up a new user
        const newGoogleUser = new Parse.User();
        newGoogleUser.set('username', socialUser.email);
        newGoogleUser.set('email', socialUser.email);
        newGoogleUser.set('googleId', socialUser.id);
        newGoogleUser.set('password', socialUser.idToken);
        newGoogleUser.set('photoUrl', socialUser.photoUrl);
        newGoogleUser.set('name', socialUser.name);

        console.log('Creating a new Google user: ln86', newGoogleUser);
        await newGoogleUser.signUp(); // Sign up and save the new user

        return newGoogleUser;
      }
    } catch (error: any) {
      console.error('Error logging in with Google:', error.message);
    }
  }

  // logging out with both Parse/Social user
  signOut(): Promise<any> {
    return Parse.User.logOut()
      .then(() => this.socialAuthService.signOut())
      .finally
      // HERE NEEDS TO NAVIGATE TO LOGOUT SCREEN
      ();
  }

  async getUser(field: string, value: string): Promise<any> {
    try {
      const user = await Parse.Cloud.run('getUserByField', { field, value });
      if (user) {
        console.log('authService., ln115 User found:', user);
        return user;
      } else {
        console.log('authService., ln118 User not found.');
        return null;
      }
    } catch (error: any) {
      console.error('authService., ln122 Error retrieving user:', error.message);
      return null;
    }
  }
}
