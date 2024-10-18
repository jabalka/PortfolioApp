import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private toggleSubject = new Subject<void>();

  toggleSidenav(){
    this.toggleSubject.next();
  }

  getToggleObserver() {
    return this.toggleSubject.asObservable();
  }
}
