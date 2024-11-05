import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './client/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authSubscription!: Subscription;
  userLogged: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
  ){}


  ngOnInit(): void {
    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.userLogged = true;
      }
    })
  }
}
