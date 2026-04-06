import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  login() {
    this.loggedIn = true;
    sessionStorage.setItem('loggedIn', 'true');
  }
  
  logout() {
    this.loggedIn = false;
    sessionStorage.removeItem('loggedIn');
  }

  isLoggedIn() {
    return this.loggedIn || sessionStorage.getItem('loggedIn') == 'true';
  }
}
