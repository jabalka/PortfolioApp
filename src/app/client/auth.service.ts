import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import Parse from 'parse';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private socialAuthService: SocialAuthService,
  ) { 
    Parse.initialize(environment.parseAppId, environment.parseJavascriptKey);
    Parse.serverURL = environment.parseServerUrl;
  }
  // custom login
  login(username: string, password: string): Promise<any>{
    return Parse.User.logIn(username, password)
  }

  // custom sign-up
  signUp(username: string, password: string, email:string): Promise<any>{
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    return user.signUp();
  }

  // Google login
  googleSignIn(): Promise<any>{
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser: SocialUser) => {
        console.log('auth-service., ln35 Google User:', socialUser);

        return this.parseGoogleLogin(socialUser);
      })
  }
  // Parse func to login/register in Google user
  async parseGoogleLogin(socialUser: SocialUser): Promise<any> {
    const googleUser = new Parse.User();
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    googleUser.set('username', socialUser.email); // Google may not return username therefore this may stay undefined;
    
    googleUser.set('email', socialUser.email);
    googleUser.set('googleId', socialUser.id);
    googleUser.set('password', socialUser.idToken);
    console.log('authService ln.,50 googleUser:', googleUser)

    try {
      // check user existance
      const userQuery = new Parse.Query(Parse.User);
    console.log('authService ln.,55 userQuery:', userQuery)
      userQuery.equalTo('googleId', socialUser.id);
      let existingUserr = await userQuery.first();
      if(!existingUserr){
        // if no existing user then sign up with Google details
        existingUserr = await googleUser.signUp();
      } else {
        // if user exists then log in or refresh session
        await existingUserr.fetch();
      }
      return existingUserr
    } catch (error){
      console.error('authSerrvice., ln63: Error logging in with Google:', error);
    }
  }


  // logging out with both Parse/Social user
  signOut(): Promise<any> {
    return Parse.User.logOut().then(() => this.socialAuthService.signOut()).finally(
      // HERE NEEDS TO NAVIGATE TO LOGOUT SCREEN
    )
  }
}
