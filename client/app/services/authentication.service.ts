import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    const currentUserUrl = '/api/currentUser';
    console.log('Retrieving current user.');
    return this.http.get(currentUserUrl);
  }

  checkLoginStatus() {
    const loginStatusUrl = '/api/user';
    console.log('Checking login status.');
    return this.http.get(loginStatusUrl);
  }

  login(user){
    const loginUrl = '/auth/login';
    console.log('Attempting to login', user.username);
    return this.http.post(loginUrl, user);
  }

  logout() {
    const logoutUrl = '/auth/logout';
    console.log('Attempting to logout current user.');
    return this.http.get(logoutUrl);
  }

  register(user) {
    console.log('Attempting to register user.username');
    this.http.post('/auth/register', user)
      .subscribe(
        data => {
          console.log('Successfully saved user: ', user.username);
        },
        err =>  {
          console.log(err);
        }
      );
  }
}
