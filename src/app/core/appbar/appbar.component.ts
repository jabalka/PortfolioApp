import { Component } from '@angular/core';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css'
})
export class AppbarComponent {

  constructor(private sidenavService: SidenavService){}

  toggleMenu() {
    this.sidenavService.toggleSidenav();
  }
}
