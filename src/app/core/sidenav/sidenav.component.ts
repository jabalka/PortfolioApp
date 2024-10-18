import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout'
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;


  constructor(
    private observer: BreakpointObserver,
    private sidenavService: SidenavService,
  ){}

  ngOnInit(){
    this.observer.observe(['(max-width: 800px']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches; // returns Boolean [true|false]
      });

      this.sidenavService.getToggleObserver().subscribe(() => {
        if(this.isMobile){
          this.sidenav.toggle();
          this.isCollapsed = false // on mobile or little screen menu can never collapse
        } else {
          this.sidenav.open(); // on big screen menu can never fully close
          this.isCollapsed = !this.isCollapsed;
        }
      })
  }


}
