import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrl: './home-buttons.component.css',
})
export class HomeButtonsComponent {
  constructor(
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
}
